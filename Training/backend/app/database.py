import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

DATABASE_URL = settings.DATABASE_URL
engine_args = {}

# If SQLite is selected in config
if DATABASE_URL.startswith("sqlite"):
    engine_args["connect_args"] = {"check_same_thread": False}

try:
    if "postgresql" in DATABASE_URL:
        # Create engine for PostgreSQL
        engine = create_engine(DATABASE_URL, **engine_args)
        # Verify connection immediately
        conn = engine.connect()
        conn.close()
        print("[Database] Successfully connected to PostgreSQL database!")
    else:
        engine = create_engine(DATABASE_URL, **engine_args)
except Exception as e:
    print(f"\n[Database WARNING] PostgreSQL connection failed: {e}")
    print("[Database INFO] Falling back gracefully to local SQLite: sqlite:///local.db\n")
    DATABASE_URL = "sqlite:///local.db"
    engine_args = {"connect_args": {"check_same_thread": False}}
    engine = create_engine(DATABASE_URL, **engine_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get active session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
