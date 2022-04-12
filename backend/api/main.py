from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import get_db, engine
from crud import PostCrud
import schemas, models

app = FastAPI()

@app.on_event("startup")
async def db_set_up():
    models.Base.metadata.create_all(engine)


@app.get("/posts", response_model=list[schemas.PostResponse])
def read_users(db: Session = Depends(get_db)):
    posts = PostCrud.get_users(db)
    return posts
