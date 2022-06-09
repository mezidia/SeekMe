import pytest
from httpx import AsyncClient
from fastapi import status

from api.main import app
from api.config import settings

@pytest.mark.anyio
async def test_users_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        response = await ac.get("/users/")
        
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.anyio
async def test_create_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        data = {
            "name": "test",
            "email": "test",
            "phone_number": "test",
            "password": "test",
        }
        response = await ac.post(url="/users/create/", headers=headers, json=data)

    assert response.status_code == status.HTTP_201_CREATED
