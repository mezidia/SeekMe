from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship

from database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, nullable=False, index=True)
    full_name = Column(String, nullable=False)
    last_place = Column(String, nullable=False)
    description = Column(String, nullable=False)
    percentage = Column(Float, default=0.0)
    image = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

    creator = relationship("User", back_populates="posts")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)

    posts = relationship("Post", back_populates="creator")


class Code(Base):
    __tablename__ = "codes"

    id = Column(Integer, primary_key=True, nullable=False, index=True)
    code = Column(Integer, nullable=False)
