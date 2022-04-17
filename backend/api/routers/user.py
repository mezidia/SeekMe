from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from database import get_db
from crud import user_crud
from oauth2 import get_current_user
import schemas

from typing import List

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    """
    read_users_me reads current user.
    :param current_user: current user
    :return: current user.
    """
    return current_user


@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=schemas.User)
def get_user(id: int, db: Session = Depends(get_db)):
    """
    get_user gets the user by id via user_crud.

    :param id: id of the user.
    :param db: database session.
    :return: user.
    """
    user = user_crud.get_user_by_id(id, db)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} was not found",
        )

    return user


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[schemas.User])
def get_users(db: Session = Depends(get_db)):
    """
    get_users gets all users via user_crud.

    :param db: database session.
    :return: all users.
    """
    users = user_crud.get_all_users(db)

    return users


@router.post(
    "/create/", status_code=status.HTTP_201_CREATED, response_model=schemas.User
)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    create_user creates the user via user_crud.

    :param user: current user.
    :param db: database session.
    :return: created user.
    """
    db_user = user_crud.get_user_by_email(user.email, db)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    return user_crud.create_user(user, db)


@router.put("/update/{id}", status_code=status.HTTP_200_OK)
def update_user(
    id: int,
    user: schemas.UserBase,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    """
    update_user updates the user by id via user_crud.

    :param id: id of the user.
    :param user: user template.
    :param db: database session.
    :param current_user: current user
    :return: status code.
    """
    if current_user.id != id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This operation is not allowed without log in",
        )
    user_crud.update_user(id, user, db)

    return {"detail": f"user with id {id} was updated"}


@router.delete("/delete/{id}", status_code=status.HTTP_404_NOT_FOUND)
def delete_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    """
    delete_user deltes the user by id via user_crud.

    :param id: id of the user.
    :param db: database session.
    :param current_user: current user
    :return: status code.
    """
    if current_user.id != id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This operation is not allowed without log in",
        )
    user_crud.delete_user(id, db)

    return {"detail": f"user with id {id} was deleted"}
