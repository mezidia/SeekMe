from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import get_db, engine
import schemas, crud, models

app = FastAPI()

@app.on_event("startup")
async def db_set_up():
    models.Base.metadata.create_all(engine)


@app.get("/posts", response_model=list[schemas.Post])
def read_users(db: Session = Depends(get_db)):
    posts = crud.get_users(db)
    return posts
