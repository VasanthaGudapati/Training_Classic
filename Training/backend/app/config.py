import os
from dotenv import load_dotenv

# Load local .env file if present
load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/cs_revision"
    )
    JWT_SECRET: str = os.getenv(
        "JWT_SECRET", "9f46ea48d88e404bb15b67efc490a61fa70b92485bb228c2e6840742f10b7ef4"
    )
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

settings = Settings()
