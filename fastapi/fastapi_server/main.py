import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.neighbors import NearestNeighbors

app = FastAPI()

# 모델 파일이 있는 절대 경로 설정
model_path = '/code/app/'  # 컨테이너 내 경로

# 모델 로드
pca_model = joblib.load(model_path + "pca_model.joblib")
knn_model = joblib.load(model_path + "knn_model.joblib")


class PredictRequest(BaseModel):
    features: list


@app.post("/predict")
async def predict(preference: PredictRequest):
    # 클러스터 생성
    df = pd.read_csv(model_path + "cluster.csv", index_col=0)
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
    distances, indices = neigh.kneighbors(reduced_data)

    closest_points = filtered_data.iloc[indices[0]]
    print(df.iloc[closest_points.index])
    return {"recommend": closest_points}


@app.get("/")
def health_check():
    return 200


@app.get("/status")
async def sayHello():
    return "Hello!!"
