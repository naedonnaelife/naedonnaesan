import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 모델 파일이 있는 절대 경로 설정
model_path = '/code/app/'  # 예시 경로, 실제 경로로 수정해야 함

# 모델 로드
pca_model = joblib.load(model_path + "pca_model.joblib")
knn_model = joblib.load(model_path + "knn_model.joblib")


class PredictRequest(BaseModel):
    features: list


@app.post("/predict")
async def predict(request: PredictRequest):
    # 입력 데이터를 numpy 배열로 변환
    print("input: ", request.features)
    data = np.array(request.features).reshape(1, -1)
    print("np data: ", data)
    # 입력 데이터에 PCA 적용
    reduced_data = pca_model.transform(data)
    print("pca data: ", reduced_data)
    # 모델 예측
    prediction = knn_model.predict(reduced_data)
    return {"prediction": int(prediction[0])}


@app.get("/")
def health_check():
    return 200


@app.get("/status")
async def sayHello():
    return "Hello!!"
