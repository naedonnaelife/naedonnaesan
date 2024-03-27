from datetime import datetime, timedelta

import httpx
import joblib
import numpy as np
import pandas as pd
import time
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from sklearn.neighbors import NearestNeighbors
from starlette.middleware.cors import CORSMiddleware
from konlpy.tag import Okt
from collections import Counter
from bertopic import BERTopic
from typing import List

# 모델 파일이 있는 절대 경로 설정
file_path = '/code/app/'  # 컨테이너 내 경로
# file_path = './'  # 로컬 테스트 경로

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

with open(file_path + 'korean_stopwords.txt', 'r', encoding='utf-8') as f:
  list_file = f.readlines() 
stopwords = list_file[0].split(",")

# 모델 로드
pca_model = joblib.load(file_path + "pca_model.joblib")
knn_model = joblib.load(file_path + "knn_model.joblib")

origins = [
    "j10e204.p.ssafy.io",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # cross-origin request에서 cookie를 포함할 것인지 (default=False)
    allow_methods=["*"],  # cross-origin request에서 허용할 method들을 나타냄. (default=['GET']
    allow_headers=["*"],  # cross-origin request에서 허용할 HTTP Header 목록
)


class PredictRequest(BaseModel):
    features: list
    token: str


async def send_data_to_spring_boot(data, token):
    async with httpx.AsyncClient() as client:
        # url = "http://localhost:8080/api/addreport"
        url = "https://j10e204.p.ssafy.io/api/addreport"
        headers = {"Authorization": f"Bearer {token}"}
        try:
            response = await client.post(url, json=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="전송 실패")


@app.post("/ai/recommend")
async def predict(preference: PredictRequest):
    label = ['dongId',
             'dongName',
             'safetyReport',
             'leisureReport',
             'foodReport',
             'healthReport',
             'convReport',
             'transpReport',
             'cafeReport',
             'pubReport']
    # 클러스터 생성
    df = pd.read_csv(file_path + "cluster.csv", index_col=0, encoding='cp949')
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
    recommend = df.iloc[result.index]
    recommend = recommend.reset_index()
    recommend['index'] += 1
    recommend = recommend.drop(axis=1, columns=['군집'])
    recommend.columns = label
    recommend = recommend.transpose()
    response = {
        "userInfo": {i: score for i, score in zip(label[2:], preference.features)},
        "recommend": [{'dongId': i} for i in recommend.iloc[0, :]]
    }
    await send_data_to_spring_boot(response, preference.token)
    return response


@app.get("/ai/keyword")
def getKeyword():

    # 오늘 날짜와 정확히 1년 전 날짜 계산
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    one_year_ago = today - timedelta(days=366)

    # 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환
    one_year_ago_str = one_year_ago.strftime("%Y-%m-%d")
    # 문자열 기반으로 1년 전 날짜에 해당하는 기사 조회를 위한 쿼리 준비
    query = {"published": {"$regex": f"^{one_year_ago_str}"}}

    # 쿼리 실행 전 시간 측정
    start_time = time.time()

    ## published 필드 기준으로 인덱싱
    collection.create_index([("published", 1)])
    # 문자열 기반으로 1년 전 날짜에 해당하는 기사 조회
    last_year_news = collection.find({"published": {"$regex": f"^{one_year_ago_str}"}})

    # 쿼리 결과를 리스트로 변환하여 길이 측정
    # 주의: 대량의 데이터를 처리할 경우, 메모리 문제를 유발할 수 있습니다.
    last_year_news = list(last_year_news)

    # 쿼리 실행 후 시간 측정
    end_time = time.time()

    # 실행 시간 출력
    print(f"쿼리 실행 시간: {end_time - start_time}초")
    # print(last_year_news[0]['article'])
    # 뉴스 기사 본문 추출
    documents = [news['article'] for news in last_year_news if 'article' in news]

    # BERTopic 모델 훈련
    topic_model = BERTopic()
    topics, _ = topic_model.fit_transform(documents)

    # 가장 대표적인 토픽 3개 추출
    topic_freq = topic_model.get_topic_info()  # 토픽과 빈도수 정보를 가져옴
    top_3_topics = topic_freq.head(4)  # 상위 3개 토픽 선택 (첫 번째 행은 전체 문서를 나타냄)

    # 각 토픽의 상위 단어 추출 및 결과 준비
    top_3_topic_words = []
    for topic_num in top_3_topics['Topic'][1:]:  # 첫 번째 행(전체 문서)는 제외
        topic_words = topic_model.get_topic(topic_num)
        top_3_topic_words.append({
            "topic": topic_num,
            "words": [word[0] for word in topic_words[:5]],  # 상위 5개 단어만 선택
            "coherence": topic_words[0][1]  # 첫 번째 단어의 점수(일관성)를 토픽의 점수로 사용
        })

    return top_3_topic_words