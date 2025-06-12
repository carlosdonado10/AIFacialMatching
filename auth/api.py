# main.py
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import RedirectResponse, HTMLResponse
from jose import jwt, JWTError
from authlib.integrations.starlette_client import OAuth

from pydantic_settings import BaseSettings
from starlette import status
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import Response


class AuthSettings(BaseSettings):
    AUTH0_CLIENT_ID: str
    AUTH0_CLIENT_SECRET: str
    AUTH0_DOMAIN: str
    AUTH0_CALLBACK_URL: str
    JWT_SECRET: str
    SESSION_SECRET: str
    HOME_URL: str

    class Config:
        env_file = ".env"

settings = AuthSettings()

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=settings.SESSION_SECRET)

# --- OAuth Setup ---
oauth = OAuth()
oauth.register(
    name="auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={"scope": "openid profile email"},
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)

# --- Middleware to protect everything except public paths ---
@app.middleware("http")
async def check_auth(request: Request, call_next):
    public_paths = ["/login", "/callback", "/logout", "/static", "/check_auth"]
    print("Received path:", request.url.path)
    if any(request.url.path.startswith(p) for p in public_paths):
        return await call_next(request)

    token = request.cookies.get("user")
    if not token:
        return RedirectResponse(url="/login")

    try:
        jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"], options={"verify_aud": False})
    except JWTError as e:
        return RedirectResponse(url="/login")

    return await call_next(request)

@app.get("/login")
async def login(request: Request):
    return await oauth.auth0.authorize_redirect(request, settings.AUTH0_CALLBACK_URL)

@app.get("/callback")
async def callback(request: Request):
    token = await oauth.auth0.authorize_access_token(request)
    userinfo = token.get("userinfo")
    if not userinfo:
        raise HTTPException(status_code=400, detail="No userinfo returned from Auth0")

    encoded = jwt.encode(userinfo, settings.JWT_SECRET, algorithm="HS256")

    response = RedirectResponse(url=settings.HOME_URL)
    response.set_cookie("user", encoded, httponly=True)
    return response


@app.get("/logout")
async def logout():
    return RedirectResponse(f"https://{settings.AUTH0_DOMAIN}/v2/logout?returnTo=http://localhost:8001")

@app.get("/api/data")
async def protected_api(request: Request):
    token = request.cookies.get("user")
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        user = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        return {"message": "This is protected data", "user": user}
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

@app.get("/check_auth/")
@app.get("/check_auth")
def check_auth(request: Request):
    return Response(status_code=status.HTTP_200_OK)
