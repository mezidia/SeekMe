from sqlalchemy.orm import Session, Query

import models, schemas

from typing import List


def get_all_codes(db: Session) -> List:
    """
    get_all_posts takes all posts from database.

    :param db: database session.
    :return: results represented by session query as a list.
    """

    return db.query(models.Post).all()


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
