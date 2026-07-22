from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict

# Pydantic Config
class UserResponse(UserBase):
    id: int
    model_config = {"from_attributes": True}



class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None


# Note Schemas
class NoteBase(BaseModel):
    day: int
    content: str

class NoteCreate(NoteBase):
    pass

class NoteResponse(NoteBase):
    id: int
    user_id: int
    model_config = {"from_attributes": True}


# Progress Schemas
class ProgressBase(BaseModel):
    day: int
    completed: bool

class ProgressCreate(ProgressBase):
    pass

class ProgressResponse(ProgressBase):
    id: int
    user_id: int
    model_config = {"from_attributes": True}



# Code Execution / Linting Schemas
class CodeRunRequest(BaseModel):
    code: str

class CodeRunResponse(BaseModel):
    exit_code: int
    stdout: str
    stderr: str


class LintErrorDetail(BaseModel):
    line: int
    offset: int
    text: str
    message: str

class CodeLintRequest(BaseModel):
    code: str
    lang: str = "python"

class CodeLintResponse(BaseModel):
    errors: List[LintErrorDetail]


# Curriculum Status Schemas
class DayStatusDetail(BaseModel):
    title: str
    path: str
    module: str
    desc: str
    exists: bool  # File system verification
    completed: bool  # Database status

class StatusResponse(BaseModel):
    days: Dict[int, DayStatusDetail]
