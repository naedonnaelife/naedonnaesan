import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.decomposition import PCA

app = FastAPI()

# 모델 파일이 있는 절대 경로 설정
model_path = '/code/app/model.joblib'  # 예시 경로, 실제 경로로 수정해야 함

# 모델 로드
model = joblib.load(model_path)


class PredictRequest(BaseModel):
    features: list


@app.post("/predict")
async def predict(request: PredictRequest):
    # 입력 데이터를 numpy 배열로 변환
    data = np.array(request.data)

    # 입력 데이터에 PCA 적용
    pca = PCA(n_components=2, random_state=512)
    reduced_data = pca.fit_transform(data)

    # 모델 예측
    prediction = model.predict(reduced_data)
    return {"prediction": int(prediction[0])}


@app.get("/")
def health_check():
    return 200


@app.get("/status")
async def sayHello():
    return "Hello!!"
