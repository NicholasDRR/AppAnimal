from app.routes import animal

from uuid import uuid4
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List


app = FastAPI()


origins = [
    "http://127.0.0.1:5500",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(animal.router)

    
    