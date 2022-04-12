from typing import Optional

from pydantic import BaseModel


class PostBase(BaseModel):
    title: str
    description: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    name: str
    phone_number: str
    password: str


class User(UserBase):
    id: int
    posts: list[Post] = []

    class Config:
        orm_mode = True
