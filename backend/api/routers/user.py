from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from database import get_db
from crud import user_crud
from oauth2 import get_current_user
import schemas

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user


@router.get("/{id}", status_code=200, response_model=schemas.User)
def get_user(id: int, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_id(id, db)
    if user is None:
        raise HTTPException(
            status_code=404,
            detail=f"User with id {id} was not found",
        )

    return user


@router.get("/", status_code=200, response_model=list[schemas.User])
def get_users(db: Session = Depends(get_db)):
    users = user_crud.get_all_users(db)

    return users
