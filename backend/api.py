# backend/api.py
from typing import List

from fastapi import FastAPI, Depends, HTTPException, APIRouter

from user_management import get_management_token, fetch_all_users, User

app = FastAPI(root_path="/api")


@app.get("/users", response_model=List[User])
def get_users():
    token = get_management_token()
    return fetch_all_users(token)
