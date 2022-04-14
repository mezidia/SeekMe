from datetime import datetime, timedelta

from jose import jwt, JWTError
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from config import settings
from crud import user_crud
import schemas, database


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes


def create_access_token(data: dict) -> str:
    """
    create_access_token creates JWT access token for user's login.

    :param data: subject data for token.
    :return: created JWT token.
    """

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    print(encoded_jwt)

    return encoded_jwt


def verify_access_token(token: str, credentials_exception) -> schemas.TokenData:
    """
    verify_access_token checks the token for a match with the user's token.

    :param token: token to verify.
    :param credentials_exception: exception for error in token decoding.
    :return: data of succesfully verified token or credentials exception if token cannot be decoded.
    """

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id = payload.get("sub")
        if id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=id)
    except JWTError as error:
        print(error)
        raise credentials_exception

    return token_data


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)
):
    """
    get_current_user returns the user object that is currently logged in.

    :param token: token to verify.
    :param db: database session.
    :return: user object that is currently logged in.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = verify_access_token(token, credentials_exception)
    user = user_crud.get_user_by_id(token.id, db)

    return user
