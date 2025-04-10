from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="ReflectAI")

app.include_router(router, prefix="/api")

