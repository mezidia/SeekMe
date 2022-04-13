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


def update_post(id: id, post: schemas.PostBase, db: Session) -> dict:
    db_user = db.query(models.User).filter(models.User.id == id)

    db_user.update(
        {
            "title": post.title,
            "description": post.description,
        },
        synchronize_session=False,
    )
    db.commit()


def delete_post(id: id, db: Session):
    db_post = db.query(models.Post).filter(models.Post.id == id)

    db_post.delete(synchronize_session=False)
    db.commit()
