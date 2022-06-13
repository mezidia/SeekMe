import pytest
from httpx import AsyncClient
from fastapi import status

from api.main import app
from api.config import settings
from .token import access_token

post_for_tests = {
    "full_name": "something",
    "last_place": "something",
    "description": "something",
    "image": "something",
}


@pytest.mark.anyio
async def test_get_by_id_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        id = 1
        response = await ac.get(f"/posts/{id}")

    expected_post = {
        "full_name": "test",
        "last_place": "test",
        "description": "test",
        "image": "test",
        "owner_id": 1,
        "id": 1,
    }

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == expected_post


@pytest.mark.anyio
async def test_get_all_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        response = await ac.get("/posts/")

    assert response.status_code == status.HTTP_200_OK


@pytest.mark.anyio
async def test_create_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        create_post_response = await ac.post(
            url="/posts/create/",
            json=post_for_tests,
            headers={
                "Authorization": f"Bearer {access_token}"
            },
        )
        await ac.delete(
            f"/posts/delete/{create_post_response.json()['id']}",
            headers={
                "Authorization": f"Bearer {access_token}"
            },
        )

        expected_post = {
            "full_name": "something",
            "last_place": "something",
            "description": "something",
            "image": "something",
            "owner_id": 1,
            "id": 2,
        }

    assert create_post_response.status_code == status.HTTP_201_CREATED
    assert create_post_response.json() == expected_post
