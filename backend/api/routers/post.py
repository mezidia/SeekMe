from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from api.database import get_db
from api.crud import post_crud
from api.oauth2 import get_current_user
from api import schemas

from typing import List

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=schemas.Post)
async def get_post(id: int, db: Session = Depends(get_db)) -> dict:
    """
    get_post_by_id takes the post via post_crud by its id.

    :param id: id of post to get.
    :param db: database session.
    :return: post info.
    """

    post = post_crud.get_post_by_id(id, db)

    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {id} was not found",
        )

    return post


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[schemas.Post])
async def get_posts(db: Session = Depends(get_db)) -> list[dict]:
    """
    get_posts takes all posts via post_crud.

    :param db: database session.
    :return: all posts.
    """

    posts = post_crud.get_all_posts(db)

    return posts


@router.get(
    "/search/{query}", status_code=status.HTTP_200_OK, response_model=List[schemas.Post]
)
async def get_posts(query: str, db: Session = Depends(get_db)) -> list[dict]:
    """
    get_posts takes all posts via post_crud.

    :param db: database session.
    :return: all posts.
    """

    posts = post_crud.get_posts_by_query(query, db)

    return posts


@router.post(
    "/create/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post
)
async def create_post(
    post: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
) -> dict:
    """
    create_post creates the post via post_crud.
    :param post: template for post data.
    :param db: database session.
    :param current_user: current user
    :return: created post.
    """

    return post_crud.create_post(current_user.id, post, db)


@router.put("/update/{id}", status_code=status.HTTP_200_OK)
async def update_post(
    id: int,
    post: schemas.PostBase,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
) -> dict:
    """
    update_post updates the post via post_crud.

    :param id: id of the post.
    :param post: template for post data.
    :param db: database session.
    :param current_user: current user
    :return: updated post.
    """

    db_post = post_crud.get_post_by_id(id, db)

    if current_user.id != db_post.owner_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This operation is not allowed without log in",
        )

    post_crud.update_post(id, post, db)

    return {"detail": f"post with id {id} was updated"}


@router.delete("/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
) -> dict:
    """
    delete_post deletes the post via post_crud.

    :param id: id of the post.
    :param db: database session.
    :param current_user: current user
    :return: status code.
    """

    db_post = post_crud.get_post_by_id(id, db)

    if current_user.id != db_post.owner_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This operation is not allowed without log in",
        )

    post_crud.delete_post(id, db)

    return {"detail": f"post with id {id} was deleted"}
