from fastapi import (
    APIRouter,
    Depends,
    status,
)
from sqlalchemy.orm import Session

from database import get_db
from crud import code_crud
from oauth2 import create_access_token
import schemas

router = APIRouter(prefix="/recover", tags=["recover"])


@router.post("", status_code=status.HTTP_200_OK, response_model=schemas.CodeData)
def generate_code(db: Session = Depends(get_db)):
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
