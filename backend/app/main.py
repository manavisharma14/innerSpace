from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routes import journal, ai_analysis

app = FastAPI()

origins = [
    "http://localhost:5173",  # Your React Frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "ReflectAI API working"}

# Registering Routes
app.include_router(journal.router)
app.include_router(ai_analysis.router)


from app.db import database, engine, metadata
metadata.create_all(engine)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()