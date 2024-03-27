import httpx
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.neighbors import NearestNeighbors
from starlette.middleware.cors import CORSMiddleware
# 여기 밑의 import는 뉴스기사용
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
import time
from pymongo import MongoClient
from datetime import datetime, timedelta
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from collections import OrderedDict
from dotenv import load_dotenv
import os

# .env 파일에서 환경변수 로드
env = 'deploy'  # test / deploy
load_dotenv(f'.env.{env}')

# 환경변수 사용
file_path = os.getenv('FILE_PATH')
user = os.getenv('MONGO_USER')
password = os.getenv('MONGO_PASSWORD')
host = os.getenv('MONGO_HOST')
port = os.getenv('MONGO_PORT')
dbname = os.getenv('MONGO_DBNAME')
spring_boot_url = os.getenv('SPRING_BOOT_URL')
# MongoDB URI 구성
uri = f"mongodb://{user}:{password}@{host}:{port}"

# MongoDB 클라이언트 생성
client = MongoClient(uri)

# 데이터베이스 선택
db = client[dbname]
# 접속 테스트를 위한 컬렉션 및 데이터 출력 예시
collection = db["news"]  # 사용할 컬렉션 이름
daily_keywords = db['daily_keywords']  # 사용할 컬렉션 선택 또는 생성


# 모델 로드
pca_model = joblib.load(file_path + "pca_model.joblib")
knn_model = joblib.load(file_path + "knn_model.joblib")

origins = [
    "*"
]

app = FastAPI()
scheduler = AsyncIOScheduler() # 매일 자정에 기사의 키워드 추출하기
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
        url = spring_boot_url
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
        'userInfo': {i: score for i, score in zip(label[2:], preference.features)},
        'recommend': [{'dongId': Id, 'dongName': Name} for Id, Name in zip(recommend.iloc[0, :], recommend.iloc[1, :])]
    }
    spring_boot_response = await send_data_to_spring_boot(response, preference.token)
    for data, obj in zip(response['recommend'], spring_boot_response['object']):
        data['isLike'] = obj['zzim']
    return response


@app.get("/ai/keyword")
def getKeyword():

    # 오늘 날짜와 정확히 1년 전 날짜 계산
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    one_year_ago = today - timedelta(days=366)

    # 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환
    one_year_ago_str = one_year_ago.strftime("%Y-%m-%d")

    # 쿼리 실행 전 시간 측정
    start_time = time.time()

    ## published 필드 기준으로 인덱싱
    collection.create_index([("published", 1)])
    # 문자열 기반으로 1년 전 날짜에 해당하는 기사 조회
    last_year_news = list(collection.find({"published": {"$regex": f"^{one_year_ago_str}"}}, {"title": 1, "_id": 0}))
    titles = [news['title'] for news in last_year_news if 'title' in news]
    # 쿼리 실행 후 시간 측정
    end_time = time.time()
    # 실행 시간 출력
    print(f"쿼리 실행 시간: {end_time - start_time}초")

    print("가져온 뉴스 기사 개수 : " + str(len(titles)) + "개")
    # 뉴스 데이터의 'title' 필드만 추출하여 리스트 생성
    
    unique_titles = list(OrderedDict.fromkeys(titles))
    len(unique_titles)
    okt = Okt()

    # 불용어 처리를 위한 stopwords 불러오기
    with open('korean_stopwords.txt', 'r', encoding='utf-8') as file:
        # 파일 내용 읽기
        content = file.read()
    stopwords = content.strip().split('\n')

    # 뉴스 제목에서 불용어 제거
    cleaned_titles = []
    for title in unique_titles:
        words = title.split()  # 공백 기준으로 단어 분리
        filtered_words = [word for word in words if word not in stopwords]  # 불용어가 아닌 단어만 선택
        cleaned_title = ' '.join(filtered_words)  # 정제된 단어들을 다시 문자열로 결합
        cleaned_titles.append(cleaned_title)

    # 형태소 분석기 초기화
    okt = Okt()

    # 명사만 추출하는 함수
    def get_nouns(text):
        nouns = okt.nouns(text)
        return [noun for noun in nouns if len(noun) > 2]  # 2글자 명사 제외

    # TfidfVectorizer 초기화 (명사만 추출하여 사용)
    tfidf_vectorizer = TfidfVectorizer(tokenizer=get_nouns, min_df=10)  # min_df는 최소 문서 빈도, 필요에 따라 조정

    # TF-IDF 계산
    tfidf_matrix = tfidf_vectorizer.fit_transform(cleaned_titles)  # cleaned_articles는 전처리된 뉴스 본문 리스트

    # 전체 문서에 대한 각 단어의 TF-IDF 점수 합산
    scores_sum = np.sum(tfidf_matrix, axis=0)

    # 배열 형태로 변환
    scores_sum_array = np.array(scores_sum).flatten()

    # 피처 이름 가져오기
    feature_names = np.array(tfidf_vectorizer.get_feature_names_out())

    # 점수에 따라 내림차순으로 정렬하고 상위 N개의 인덱스 가져오기
    top_n_indices = np.argsort(scores_sum_array)[::-1][:3]  # 상위 10개 키워드

    # 상위 N개 키워드와 점수 출력
    result = []
    print("Top N Keywords:")
    for index in top_n_indices:
        result.append(feature_names[index])


    document = {
        "date": today.strftime("%Y-%m-%d"),
        "keywords": result
    }

    # # 문서를 MongoDB 컬렉션에 저장
    daily_keywords.insert_one(document)
    return result

# 스케줄러 시작
scheduler.add_job(
    getKeyword,  # 실행할 함수
    CronTrigger(hour=0, minute=0, timezone='Asia/Seoul')
)
scheduler.start()

