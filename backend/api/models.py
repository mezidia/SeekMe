from sqlalchemy import Column, Integer, String, Sequence

from database import Base


class PostModel(Base):
    __tablename__ = "post"

    id = Column(Integer, Sequence("seq_street_segment_id"))
    name = Column(String, primary_key=True, nullable=False)
    description = Column(String, nullable=False)
