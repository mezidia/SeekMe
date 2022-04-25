from sqlalchemy.orm import Session

from hashing import Hash
import models


def create_code(code: int, db: Session) -> models.Code:
    """
    create_code creates code's new raw in database.

    :param code: generated code.
    :param db: database session.
    :return: created code object.
    """

    db_code = models.Code(code=code)

    db.add(db_code)
    db.commit()
    db.refresh(db_code)

    return db_code


def check_code(code: int, db: Session) -> models.Code:
    """
    check_code checks code in database.

    :param code: code to check.
    :param db: database session.
    :return: code object.
    """

    db_code = db.query(models.Code).filter(models.Code.code == code)

    return db_code.first()


def delete_code(code: int, db: Session) -> None:
    """
    delete_post removes post from database by his id.

    :param id: id of post to delete.
    :param db: database session.
    :return: None.
    """

    db_code = db.query(models.Code).filter(models.Code.code == code)

    db_code.delete(synchronize_session=False)
    db.commit()


def update_user(email: str, password: str, db: Session) -> None:
    """
    update_user updates user value fields in database by his id.

    :param id: id of user to update.
    :param user: pydantic base user schema.
    :param db: database session.
    :return: None.
    """

    db_user = db.query(models.User).filter(models.User.email == email)

    hashed_pwd = Hash.bcrypt(password)

    db_user.update(
        {
            "password": hashed_pwd,
        },
        synchronize_session=False,
    )
    db.commit()
