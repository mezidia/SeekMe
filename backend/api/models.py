from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class PostModel(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True, nullable=False, index=True)
    name = Column(String, primary_key=True, nullable=False)
    description = Column(String, nullable=False)
