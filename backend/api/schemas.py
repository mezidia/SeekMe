from pydantic import BaseModel


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone_number: str

    class Config:
        orm_mode = True


class PostResponse(BaseModel):
    id: int
    name: str
    description: str
    creator: UserResponse

    class Config:
        orm_mode = True
