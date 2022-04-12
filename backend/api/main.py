from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db, engine
import schemas, models, crud

app = FastAPI()


@app.on_event("startup")
async def db_set_up():
    models.Base.metadata.create_all(engine)


@app.get("/users/{id}", response_model=schemas.User)
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = crud.get_user(id, db)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.get("/users", response_model=list[schemas.User])
def get_all_posts(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    return users
