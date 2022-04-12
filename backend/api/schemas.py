from typing import List, Optional

from pydantic import BaseModel


class PostBase(BaseModel):
    name: str
    description: str


class Post(PostBase):
    id: int

    class Config:
        orm_mode = True
