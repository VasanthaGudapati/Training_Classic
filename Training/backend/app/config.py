import os
from dotenv import load_dotenv

# Load local .env file if present
load_dotenv()

class Settings:
    _raw_db_url: str = os.getenv(
        "DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/cs_revision"
    )
    # Render provides 'postgres://', SQLAlchemy 2.0 requires 'postgresql://'
    DATABASE_URL: str = (
        _raw_db_url.replace("postgres://", "postgresql://", 1)
        if _raw_db_url.startswith("postgres://")
        else _raw_db_url
    )

    JWT_SECRET: str = os.getenv(
        "JWT_SECRET", "9f46ea48d88e404bb15b67efc490a61fa70b92485bb228c2e6840742f10b7ef4"
    )
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # CORS Allowed Origins
    _raw_origins: str = os.getenv("ALLOWED_ORIGINS", "*")
    ALLOWED_ORIGINS: list = [
        origin.strip() for origin in _raw_origins.split(",") if origin.strip()
    ]

settings = Settings()

