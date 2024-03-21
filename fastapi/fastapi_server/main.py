import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 모델 파일이 있는 절대 경로 설정
model_path = '/code/app/model.joblib'  # 예시 경로, 실제 경로로 수정해야 함

# 모델 로드
model = joblib.load(model_path)


class PredictRequest(BaseModel):
    features: list


@app.post("/predict")
async def predict(request: PredictRequest):
    features = np.array(request.features).reshape(1, -1)
    prediction = model.predict(features)
    return {"prediction": int(prediction[0])}


@app.get("/")
def health_check():
    return 200


@app.get("/status")
async def sayHello():
    return "Hello!!"
