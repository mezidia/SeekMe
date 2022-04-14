from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from database import get_db
from crud import post_crud
from oauth2 import get_current_user
import schemas

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("/{id}", status_code=200, response_model=schemas.Post)
def get_post(id: int, db: Session = Depends(get_db)):
    post = post_crud.get_post_by_id(id, db)
    if post is None:
        raise HTTPException(
            status_code=404,
            detail=f"Post with id {id} was not found",
        )

    return post


@router.get("/", status_code=200, response_model=list[schemas.User])
def get_users(db: Session = Depends(get_db)):
    users = post_crud.get_all_users(db)

    return users


@router.post("/create/", status_code=201, response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = post_crud.get_user_by_email(user.email, db)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return post_crud.create_user(user, db)


@router.put("/update/{id}", status_code=200)
def update_user(
    id: int,
    user: schemas.UserBase,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    if current_user.id != id:
        raise HTTPException(
            status_code=403, detail=f"This operation is not allowed without log in"
        )
    post_crud.update_user(id, user, db)

    return {"detail": f"user with id {id} was updated"}


@router.delete("/delete/{id}", status_code=404)
def delete_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    if current_user.id != id:
        raise HTTPException(
            status_code=403, detail=f"This operation is not allowed without log in"
        )
    post_crud.delete_user(id, db)

    return Response(status_code=404)
