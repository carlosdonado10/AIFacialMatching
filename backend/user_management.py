from datetime import datetime
from typing import List, Dict, Any

import requests
from pydantic import BaseModel

from settings import settings


class User(BaseModel):
    """
    A user object as returned by the Auth0 Management API.

    Attributes:
        user_id (str): Unique identifier of the user in Auth0.
        name (str): Full name of the user.
        nickname (str): User's nickname.
        email (str): User's email address.
        last_login (datetime): Timestamp of the user's last login.
    """
    user_id: str
    name: str
    nickname: str
    email: str
    last_login: datetime


def get_management_token() -> str:
    """
    Retrieves a machine-to-machine access token from Auth0 for use with the Management API.

    Returns:
        str: A bearer access token used to authenticate Management API requests.

    Raises:
        requests.HTTPError: If the token request fails.
    """
    response = requests.post(settings.token_url, json={
        "client_id": settings.AUTH0_MACHINE_TO_MACHINE_CLIENT_ID,
        "client_secret": settings.AUTH0_MACHINE_TO_MACHINE_CLIENT_SECRET,
        "audience": settings.audience,
        "grant_type": "client_credentials"
    })

    response.raise_for_status()
    data: Dict[str, Any] = response.json()
    return data["access_token"]


def fetch_all_users(token: str) -> List[User]:
    """
    Retrieves all users from the Auth0 Management API using the provided token.

    Args:
        token (str): A valid Auth0 Management API access token.

    Returns:
        List[User]: A list of `User` objects representing all users in the tenant.

    Raises:
        requests.HTTPError: If any of the paginated requests fail.
    """
    headers = {
        "Authorization": f"Bearer {token}"
    }

    users: List[Dict[str, Any]] = []
    page = 0
    per_page = 50

    while True:
        resp = requests.get(settings.users_url, headers=headers, params={
            "page": page,
            "per_page": per_page
        })
        resp.raise_for_status()

        batch: List[Dict[str, Any]] = resp.json()
        if not batch:
            break

        users.extend(batch)
        page += 1

    return [User(**user) for user in users]
