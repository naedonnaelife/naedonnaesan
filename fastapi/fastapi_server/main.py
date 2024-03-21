import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 모델 로드
model = joblib.load('ml/Clustering/model.joblib')


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
