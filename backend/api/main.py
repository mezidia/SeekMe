from fastapi import FastAPI, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from database import get_db, engine
from crud import post_crud, user_crud
import schemas, models

app = FastAPI()


@app.on_event("startup")
async def db_set_up():
    models.Base.metadata.create_all(engine)


@app.get("/users/{id}", status_code=200, response_model=schemas.User)
def get_user(id: int, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_id(id, db)
    if user is None:
        raise HTTPException(
            status_code=404,
            detail=f"User with id {id} was not found",
        )

    return user


@app.get("/users", status_code=200, response_model=list[schemas.User])
def get_users(db: Session = Depends(get_db)):
    users = user_crud.get_all_users(db)

    return users
