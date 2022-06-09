import pytest
from httpx import AsyncClient
from fastapi import status

from api.main import app
from api.config import settings
from .token import access_token


@pytest.mark.anyio
async def test_me_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        response = await ac.get(
            "/users/me/", headers={"Authorization": f"Bearer {access_token}"}
        )
        
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.anyio
async def test_users_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        response = await ac.get("/users/")

    assert response.status_code == status.HTTP_200_OK

@pytest.mark.anyio
async def test_create_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        data = {
            "name": "test",
            "email": "test",
            "phone_number": "test",
            "password": "test",
        }
        response = await ac.post(url="/users/create/", json=data)

    assert response.status_code == status.HTTP_201_CREATED
