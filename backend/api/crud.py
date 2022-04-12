from sqlalchemy.orm import Session

import models


def get_user(id: int, db: Session):
    return db.query(models.User).filter(models.User.id == id).first()

def get_users(db: Session):
    return db.query(models.User).all()


