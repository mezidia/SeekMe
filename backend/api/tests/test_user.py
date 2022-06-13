import pytest
from httpx import AsyncClient
from fastapi import status

from api.main import app
from api.config import settings
from .token import access_token


user_for_tests = {
    "name": "something",
    "email": "something@gmail.com",
    "phone_number": "1111111",
    "password": "something",
}


@pytest.mark.anyio
async def test_get_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        response = await ac.get(
            "/users/me/", headers={"Authorization": f"Bearer {access_token}"}
        )

    assert response.status_code == status.HTTP_200_OK


@pytest.mark.anyio
async def test_get_by_id_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        id = 1
        response = await ac.get(f"/users/{id}")

    expected_user = {
        "name": "test",
        "email": "test",
        "phone_number": "test",
        "id": 1,
        "posts": [
            {
                "full_name": "test",
                "last_place": "test",
                "description": "test",
                "image": "test",
                "owner_id": 1,
                "id": 1,
            }
        ],
    }

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == expected_user


@pytest.mark.anyio
async def test_get_all_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        response = await ac.get("/users/")

    assert response.status_code == status.HTTP_200_OK


@pytest.mark.anyio
async def test_create_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        create_user_response = await ac.post(url="/users/create/", json=user_for_tests)
        login_user_response = await ac.post(
            "/login",
            data={
                "username": user_for_tests["email"],
                "password": user_for_tests["password"],
            },
        )
        await ac.delete(
            f"/users/delete/{create_user_response.json()['id']}",
            headers={
                "Authorization": f"Bearer {login_user_response.json()['access_token']}"
            },
        )

    assert create_user_response.status_code == status.HTTP_201_CREATED


@pytest.mark.anyio
async def test_update_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        updated_info = {
            "name": "something1",
            "email": "something1@gmail.com",
            "phone_number": "1111111",
            "password": "something1",
        }

        create_user_response = await ac.post(url="/users/create/", json=user_for_tests)
        login_user_response = await ac.post(
            "/login",
            data={
                "username": user_for_tests["email"],
                "password": user_for_tests["password"],
            },
        )
        update_user_response = await ac.put(
            f"/users/update/{create_user_response.json()['id']}",
            headers={
                "Authorization": f"Bearer {login_user_response.json()['access_token']}"
            },
            json=updated_info,
        )
        get_user_by_id_response = await ac.get(
            f"/users/{create_user_response.json()['id']}",
            headers={
                "Authorization": f"Bearer {login_user_response.json()['access_token']}"
            },
        )
        await ac.delete(
            f"/users/delete/{create_user_response.json()['id']}",
            headers={
                "Authorization": f"Bearer {login_user_response.json()['access_token']}"
            },
        )

    assert update_user_response.status_code == status.HTTP_200_OK
    assert get_user_by_id_response.json()["email"] == updated_info["email"]
    assert (
        update_user_response.json()["detail"]
        == f"user with id {create_user_response.json()['id']} was updated"
    )


@pytest.mark.anyio
async def test_delete_route():
    async with AsyncClient(app=app, base_url=settings.alternative_host_for_api) as ac:
        create_user_response = await ac.post(url="/users/create/", json=user_for_tests)
        login_user_response = await ac.post(
            "/login",
            data={
                "username": user_for_tests["email"],
                "password": user_for_tests["password"],
            },
        )
        delete_user_response = await ac.delete(
            f"/users/delete/{create_user_response.json()['id']}",
            headers={
                "Authorization": f"Bearer {login_user_response.json()['access_token']}"
            },
        )

    assert delete_user_response.status_code == status.HTTP_404_NOT_FOUND
    assert (
        delete_user_response.json()["detail"]
        == f"user with id {create_user_response.json()['id']} was deleted"
    )
