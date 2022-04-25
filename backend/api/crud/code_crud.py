from sqlalchemy.orm import Session

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


def delete_code(id: id, db: Session) -> None:
    """
    delete_post removes post from database by his id.

    :param id: id of post to delete.
    :param db: database session.
    :return: None.
    """

    db_post = db.query(models.Post).filter(models.Post.id == id)

    db_post.delete(synchronize_session=False)
    db.commit()
