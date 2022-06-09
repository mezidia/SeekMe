import pytest
from httpx import AsyncClient

from api.main import app

@pytest.mark.anyio
async def test_users_route():
    async with AsyncClient(app=app, base_url="http://") as ac:
        response = await ac.get("/users")
    assert response.status_code == 200
    assert response.json() == [
        {
            "name": "Arthas",
            "email": "arthas@gmail.com",
            "phone_number": "789505234",
            "id": 1,
            "posts": []
        }
    ]
