from app.routes import animal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    "http://127.0.0.1:5500/",
    "http://127.0.0.1:5500",
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(animal.router)