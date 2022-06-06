from pydantic import BaseSettings


class Settings(BaseSettings):
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    gmail_password: str
    host_for_api: str
    alternative_host_for_api: str

    class Config:
        env_file = "../.env"


settings = Settings()
