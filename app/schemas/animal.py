from pydantic import BaseModel, Field

from app.utils import dict_regex


class Animal(BaseModel):
    name: str
    birthday: str = Field(pattern=dict_regex["date pattern"])
    breed: str
    gender: str = Field(pattern=dict_regex["gender pattern"])
    neutering: str = Field(pattern=dict_regex["neutering pattern"])
    weight: str
    image: str