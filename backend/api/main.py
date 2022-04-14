from fastapi import FastAPI

from database import engine
from routers import user, post, auth
import models


app = FastAPI()


@app.on_event("startup")
async def db_set_up():
    models.Base.metadata.create_all(engine)


app.include_router(user.router)
app.include_router(post.router)
app.include_router(auth.router)
