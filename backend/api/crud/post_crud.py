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

# def update_user(id: id, user: schemas.UserBase, db: Session) -> dict:
#     db_user = db.query(models.User).filter(models.User.id == id)

#     db_user.update(
#         {
#             "name": user.name,
#             "email": user.email,
#             "phone_number": user.phone_number,
#         },
#         synchronize_session=False,
#     )
#     db.commit()

def delete_post(id: id, db: Session):
    db_post = db.query(models.Post).filter(models.Post.id == id)

    db_post.delete(synchronize_session=False)
    db.commit()
