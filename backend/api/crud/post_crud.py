from sqlalchemy.orm import Session, Query

import models, schemas


def get_post_by_id(id: int, db: Session) -> Query:
    """
    get_post_by_id takes the post from database by its id.

    :param id: id of post to get.
    :param db: database session.
    :return: first result of session query or None if the result doesn't contain any row.
    """

    return db.query(models.Post).filter(models.Post.id == id).first()


def get_posts_by_query(q: str, db: Session) -> list:
    """
    get_post_by_id takes the post from database by its id.

    :param id: id of post to get.
    :param db: database session.
    :return: first result of session query or None if the result doesn't contain any row.
    """

    posts = db.query(models.Post).all()
    queried_posts = []
    desperate_qs = q.split(" ")

    for post in posts:
        for desperate_q in desperate_qs:
            if (
                desperate_q in post.full_name
                or desperate_q in post.last_place
                or desperate_q in post.description
            ):
                queried_posts.append(post)

    return queried_posts


def get_all_posts(db: Session) -> list:
    """
    get_all_posts takes all posts from database.

    :param db: database session.
    :return: results represented by session query as a list.
    """

    return db.query(models.Post).all()


def create_post(user_id: int, post: schemas.PostCreate, db: Session) -> models.Post:
    """
    create_post creates user's new post in database.

    :param user_id: id of the user who creates the post.
    :param post: pydantic post creation schema.
    :param db: database session.
    :return: created post object.
    """

    db_post = models.Post(**post.dict(), owner_id=user_id)

    db.add(db_post)
    db.commit()
    db.refresh(db_post)

    return db_post


def update_post(id: id, post: schemas.PostBase, db: Session) -> None:
    """
    update_post updates post value fields in database by its id.

    :param id: id of post to update.
    :param post: pydantic base post schema.
    :param db: database session.
    :return: None.
    """

    db_post = db.query(models.Post).filter(models.Post.id == id)

    db_post.update(
        {
            "title": post.title,
            "description": post.description,
        },
        synchronize_session=False,
    )
    db.commit()


def delete_post(id: id, db: Session) -> None:
    """
    delete_post removes post from database by his id.

    :param id: id of post to delete.
    :param db: database session.
    :return: None.
    """

    db_post = db.query(models.Post).filter(models.Post.id == id)

    db_post.delete(synchronize_session=False)
    db.commit()
