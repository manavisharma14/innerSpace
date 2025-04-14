from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routes import journal, ai_analysis, dashboard

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://innerspaceai.netlify.app/"
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
app.include_router(dashboard.router)


from app.db import database, engine, metadata
metadata.create_all(engine)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()