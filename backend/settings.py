from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    AUTH0_MACHINE_TO_MACHINE_DOMAIN: str
    AUTH0_MACHINE_TO_MACHINE_CLIENT_ID: str
    AUTH0_MACHINE_TO_MACHINE_CLIENT_SECRET: str

    @property
    def audience(self) -> str:
        return f"https://{self.AUTH0_MACHINE_TO_MACHINE_DOMAIN}/api/v2/"

    @property
    def token_url(self) -> str:
        return f"https://{self.AUTH0_MACHINE_TO_MACHINE_DOMAIN}/oauth/token"

    @property
    def users_url(self) -> str:
        return f"https://{self.AUTH0_MACHINE_TO_MACHINE_DOMAIN}/api/v2/users"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
