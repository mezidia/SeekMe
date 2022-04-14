from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from database import get_db
from crud import post_crud
from oauth2 import get_current_user
import schemas

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=schemas.Post)
def get_post(id: int, db: Session = Depends(get_db)):
    """
    get_post_by_id takes the post via post_crud by its id.

    :param id: id of post to get.
    :param db: database session.
    :return: post info.
    """
    post = post_crud.get_post_by_id(id, db)
    if post is None:
        raise HTTPException(
            status_code=404,
            detail=f"Post with id {id} was not found",
        )

    return post


@router.get("/", status_code=200, response_model=list[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    """
    get_posts takes all posts via post_crud.

    :param db: database session.
    :return: all posts.
    """
    posts = post_crud.get_all_posts(db)

    return posts


@router.post("/create/", status_code=201, response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db),current_user: schemas.User = Depends(get_current_user)):
    """
    create_post creates the post via post_crud.

    :param post: template for post data.
    :param db: database session.
    :param current_user: current user
    :return: created post.
    """
    return post_crud.create_post(current_user.id, post, db)


@router.put("/update/{id}", status_code=200)
def update_post(
    id: int,
    post: schemas.PostBase,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
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
            status_code=403, detail=f"This operation is not allowed without log in"
        )
    post_crud.update_post(id, post, db)

    return {"detail": f"post with id {id} was updated"}


@router.delete("/delete/{id}", status_code=404)
def delete_post(
    id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    db_post = post_crud.get_post_by_id(id, db)
    if current_user.id != db_post.owner_id:
        raise HTTPException(
            status_code=403, detail=f"This operation is not allowed without log in"
        )
    post_crud.delete_post(id, db)

    return Response(status_code=404)
