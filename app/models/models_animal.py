from pydantic import BaseModel


class Animal(BaseModel):
    name: str
    age: int
    gender: str
    color: str