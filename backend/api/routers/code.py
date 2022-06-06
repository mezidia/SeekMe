import random

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from utils import email as email_utils
from crud import code_crud, user_crud
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

    user = user_crud.get_user_by_email(email, db)

    if user:
        code = random.randint(100000, 999999)
        email_utils.send_email(email, str(code))

        return code_crud.create_code(code=code, db=db)

    raise HTTPException(status_code=404, detail="Користувача з такою поштою немає")


@router.post("/check", status_code=status.HTTP_200_OK, response_model=schemas.Token)
def check_code(code: int, db: Session = Depends(get_db)):
    """
    generate_code generates random code and store him in the database.

    :param id: id of post to get.
    :param db: database session.
    :return: post info.
    """

    if code_crud.check_code(code=code, db=db):
        code_crud.delete_code(code=code, db=db)
        access_token = create_access_token(data={"sub": str(code)})

        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=404, detail="Код невірний")


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
