from sqlalchemy.orm import Session

import models, schemas

def get_post_by_id(id: int, db: Session):
    return db.query(models.Post).filter(models.Post.id == id).first()

def get_posts(db: Session):
    return db.query(models.Post).all()

def create_post(user_id: int, post: schemas.PostCreate, db: Session):
    db_post = models.Item(**post.dict(), owner_id=user_id)

    db.add(db_post)
    db.commit()
    db.refresh(db_post)

    return db_post
