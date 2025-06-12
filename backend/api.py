# backend/api.py
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
import os


app = FastAPI(root_path="/api")

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_AUDIENCE = os.getenv("AUTH0_API_AUDIENCE")
ALGORITHMS = ["RS256"]

auth_scheme = HTTPBearer()

@app.get("/public")
def public():
    return {"message": "This is a public endpoint."}

@app.get("/protected")
def protected(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    token = credentials.credentials
    try:
        unverified_header = jwt.get_unverified_header(token)
        # In production, retrieve and cache JWKS to verify token
        payload = jwt.decode(token, "your-secret-key", algorithms=ALGORITHMS, audience=API_AUDIENCE)
        return {"message": "You are authorized", "claims": payload}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")