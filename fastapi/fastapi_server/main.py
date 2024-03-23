from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def health_check():
    return 200

@app.get("/status")
async def sayHello():
    return "Hello!!"