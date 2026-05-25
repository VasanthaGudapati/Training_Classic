import datetime
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    notes = relationship("Note", back_populates="owner", cascade="all, delete-orphan")
    progress = relationship("DayProgress", back_populates="owner", cascade="all, delete-orphan")


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(Integer, index=True, nullable=False)
    content = Column(Text, default="")
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    owner = relationship("User", back_populates="notes")

    # Enforce unique note per user per day
    __table_args__ = (
        UniqueConstraint("user_id", "day", name="uq_user_day_note"),
    )


class DayProgress(Base):
    __tablename__ = "day_progress"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(Integer, index=True, nullable=False)
    completed = Column(Boolean, default=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    owner = relationship("User", back_populates="progress")

    # Enforce unique progress entry per user per day
    __table_args__ = (
        UniqueConstraint("user_id", "day", name="uq_user_day_progress"),
    )
