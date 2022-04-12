from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db, engine
import schemas, models, crud

app = FastAPI()

@app.on_event("startup")
async def db_set_up():
    models.Base.metadata.create_all(engine)

@app.get("/posts/{id}", response_model=list[schemas.Post])
def get_post_by_id(id: int, db: Session = Depends(get_db)):
    post = crud.get_post(id, db)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.get("/posts", response_model=list[schemas.Post])
def get_all_posts(db: Session = Depends(get_db)):
    posts = crud.get_posts(db)
    return posts
