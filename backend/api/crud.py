from sqlalchemy.orm import Session

import models


def get_post(id: int, db: Session):
    return db.query(models.Post).filter(models.Post.id == id).first()

def get_posts(db: Session):
    return db.query(models.Post).all()


