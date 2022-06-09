from fastapi.testclient import TestClient

from api.main import app

client = TestClient(app)


def get_token() -> str:
    token_response = client.post(
        "/login", data={"username": "test", "password": "test"}
    )
    access_token = token_response.json()["access_token"]
    return access_token

access_token = get_token()
