from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import get_db
import schemas, crud

app = FastAPI()


@app.get("/posts", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    posts = crud.get_users(db)
    return posts
