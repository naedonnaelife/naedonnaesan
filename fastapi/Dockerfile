FROM python:3.11-slim
# fastAPI 의 작업 위치가 /code이라는 뜻
WORKDIR /code

# requirements.txt(위치 : ./fastapi_env/Scripts)를 작업공간(/code)로 옮기기 
# dockerFile로 부터 상대적인 위치
COPY ./fastapi_env/Scripts/requirements.txt /code/requirements.txt
COPY ./fastapi_env/Scripts/.env /code/.env

# 패키지 리스트 업데이트 및 빌드 의존성 설치
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# pip install 해주기 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# main.py 위치가 ./fastapi_server 
COPY ./fastapi_server /code/app 

# 실행하기app 에 fastapi_server를 붙여넣었으므로 app으로 이동해서 uvicorn main:app --reload
# 5000번 사용하기 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]
