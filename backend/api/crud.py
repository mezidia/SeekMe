from sqlalchemy.orm import Session

import models, schemas


def get_user_by_id(id: int, db: Session):
    return db.query(models.User).filter(models.User.id == id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_all_users(db: Session):
    return db.query(models.User).all()

def create_user(user: schemas.UserCreate, db: Session):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(
        name=user.name,
        email=user.email,
        phone_number=user.phone_number, 
        password=fake_hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(id: id, user: schemas.UserBase, db: Session) -> dict:
    db_user = db.query(models.User).filter(models.User.id == id)

    db_user.update(
        {
            "name": user.name,
            "email": user.email,
            "phone_number": user.phone_number,
        },
        synchronize_session=False,
    )
    db.commit()

    return db_user
