from sqlalchemy.orm import Session, Query

from hashing import Hash
import models, schemas


def get_user_by_id(id: int, db: Session) -> Query:
    """
    get_user_by_id takes the use from database by his id.

    :param id: id of user to get.
    :param db: database session.
    :return: first result of session query or None if the result doesn't contain any row.
    """ 

    return db.query(models.User).filter(models.User.id == id).first()


def get_user_by_email(email: str, db: Session) -> Query:
    """
    get_user_by_email takes the use from database by his email.

    :param email: email of user to get.
    :param db: database session.
    :return: first result of session query or None if the result doesn't contain any row.
    """ 

    return db.query(models.User).filter(models.User.email == email).first()


def get_all_users(db: Session) -> list:
    """
    get_all_users takes all users from database.

    :param db: database session.
    :return: results represented by session query as a list.
    """ 

    return db.query(models.User).all()


def create_user(user: schemas.UserCreate, db: Session) -> models.User:
    """
    create_user creates new user in database.

    :param user: pydantic user creation schema.
    :param db: database session.
    :return: created user object.
    """ 

    db_user = models.User(**user.dict())
    hashed_pwd = Hash.bcrypt(db_user.password)
    db_user.password = hashed_pwd

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def update_user(id: id, user: schemas.UserBase, db: Session) -> None:
    """
    update_user updates user value fields in database by his id.

    :param id: id of user to update.
    :param user: pydantic base user schema.
    :param db: database session.
    :return: None.
    """ 

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


def delete_user(id: id, db: Session) -> None:
    """
    delete_user removes user from database by his id.

    :param id: id of user to delete.
    :param db: database session.
    :return: None.
    """ 

    db_user = db.query(models.User).filter(models.User.id == id)

    db_user.delete(synchronize_session=False)
    db.commit()
