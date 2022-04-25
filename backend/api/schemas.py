from typing import Optional, List

from pydantic import BaseModel


class PostBase(BaseModel):
    full_name: str
    last_place: str
    description: str
    image: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    owner_id: int
    id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    name: str
    email: str
    phone_number: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    posts: List[Post] = []

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


class CodeData(BaseModel):
    code: int
