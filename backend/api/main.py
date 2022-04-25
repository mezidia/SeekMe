from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from routers import user, post, password, auth
import models


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def db_set_up():
    models.Base.metadata.create_all(engine)


app.include_router(user.router)
app.include_router(post.router)
app.include_router(auth.router)
app.include_router(password.router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", reload=True)
