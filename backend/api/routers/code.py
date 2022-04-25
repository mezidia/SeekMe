from fastapi import (
    APIRouter,
    Depends,
    status,
)
from sqlalchemy.orm import Session

from database import get_db
from crud import code_crud
from oauth2 import create_access_token, get_current_user
import schemas

router = APIRouter(prefix="/recover", tags=["recover"])


@router.post("", status_code=status.HTTP_200_OK, response_model=schemas.CodeData)
def generate_code(email: str, db: Session = Depends(get_db)):
    """
    generate_code generates random code and store him in the database.

    :param id: id of post to get.
    :param db: database session.
    :return: post info.
    """
    import random

    code = random.randint(100000, 999999)

    return code_crud.create_code(code=code, db=db)


@router.post("/check", status_code=status.HTTP_200_OK, response_model=schemas.Token)
def check_code(code: int, db: Session = Depends(get_db)):
    """
    generate_code generates random code and store him in the database.

    :param id: id of post to get.
    :param db: database session.
    :return: post info.
    """
    if code_crud.check_code(code=code, db=db):
        access_token = create_access_token(data={"sub": str(code)})
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        return None


@router.post("/update", status_code=status.HTTP_200_OK, response_model=schemas.Token)
def update_user(
    email: str,
    password: str,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    """
    generate_code generates random code and store him in the database.

    :param id: id of post to get.
    :param db: database session.
    :return: post info.
    """
    code_crud.update_user(email, password, db)
