import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.neighbors import NearestNeighbors
from pymongo import MongoClient
from datetime import datetime, timedelta
from bson import ObjectId

# MongoDB 접속 정보
user = "mango"
password = "sweetmango123"
host = "j10e204.p.ssafy.io"  # 또는 MongoDB가 실행되고 있는 서버의 주소
port = 27017
dbname = "mango"  # 접속하고자 하는 데이터베이스 이름

# MongoDB URI 구성
uri = f"mongodb://{user}:{password}@{host}:{port}"

# MongoDB 클라이언트 생성
client = MongoClient(uri)

# 데이터베이스 선택
db = client[dbname]
# 접속 테스트를 위한 컬렉션 및 데이터 출력 예시
collection = db["news"]  # 사용할 컬렉션 이름

# documents = collection.find()  # 컬렉션 내 모든 문서 조회

# 오늘 날짜와 정확히 1년 전 날짜 계산
today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
one_year_ago = today - timedelta(days=366)

# 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환
one_year_ago_str = one_year_ago.strftime("%Y-%m-%d")
# 문자열 기반으로 1년 전 날짜에 해당하는 기사 조회
last_year_news = collection.find({"published": {"$regex": f"^{one_year_ago_str}"}})
last_year_news = list(last_year_news)

print(len(last_year_news))
print(one_year_ago)

with open('korean_stopwords.txt', 'r', encoding='utf-8') as f:
  list_file = f.readlines() 
stopwords = list_file[0].split(",")
print(list_file)
app = FastAPI()

# 모델 파일이 있는 절대 경로 설정
model_path = '/code/app/'  # 컨테이너 내 경로

# 모델 로드
# pca_model = joblib.load(model_path + "pca_model.joblib")
# knn_model = joblib.load(model_path + "knn_model.joblib")
pca_model = joblib.load("pca_model.joblib")
knn_model = joblib.load("knn_model.joblib")


class PredictRequest(BaseModel):
    features: list


@app.post("/ai/recommend")
async def predict(preference: PredictRequest):
    # 클러스터 생성
    df = pd.read_csv(model_path + "cluster.csv", index_col=0, encoding='cp949')
    df_train = df.drop(axis=1, columns=['법정동', '군집'])
    pc = pca_model.fit_transform(df_train)
    cluster = pd.DataFrame(pc)
    cluster['target'] = df['군집']

    # 입력 데이터 numpy 배열로 변환
    input_data = np.array(preference.features).reshape(1, -1)

    # 입력 데이터에 PCA 적용
    reduced_data = pca_model.transform(input_data)

    # 타겟 모델 예측
    predict_data = knn_model.predict(reduced_data)

    # 추천
    filtered_data = cluster[cluster['target'] == predict_data[0]]

    neigh = NearestNeighbors(n_neighbors=3)
    neigh.fit(filtered_data.drop(axis=1, columns=['target']))
    distances, indices = neigh.kneighbors(reduced_data)  # 임시 값

    # 결과 처리
    result = filtered_data.iloc[indices[0]]
    recommend = df.iloc[result.index].transpose()
    recommend.columns = recommend.columns + 1  # db에 맞춰 인덱스 보정
    print(recommend)  # 결과 확인용

    return recommend.to_dict()

@app.post("/")
def test():
    return ""

@app.get("/")
def health_check():
    return 200


@app.get("/status")
async def sayHello():
    return "Hello!!"
