from fastapi import (
    APIRouter,
    Depends,
    status,
)
from sqlalchemy.orm import Session

from database import get_db
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

    return {"code": code}
