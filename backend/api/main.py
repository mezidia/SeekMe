import uvicorn
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .routers import user, post, code, auth
from .config import settings


app = FastAPI()

origins = [
    settings.host_for_api,
    settings.alternative_host_for_api,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", status_code=status.HTTP_200_OK)
async def main() -> dict:
    """
    main prints info about documentation

    :return: json.
    """

    return {"detail": "To see documentation go to the /docs route."}


@app.on_event("startup")
async def db_set_up() -> None:
    models.Base.metadata.create_all(engine)


app.include_router(user.router)
app.include_router(post.router)
app.include_router(auth.router)
app.include_router(code.router)


if __name__ == "__main__":

    uvicorn.run("main:app", reload=True)
