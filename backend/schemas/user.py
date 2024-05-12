# Pydantic model

from pydantic import BaseModel
from dataclasses import dataclass
class UserBase(BaseModel):
    username: str
    full_name: str
    email: str

class UserCreate(UserBase):
    password: str

class UserById(UserBase):
    id: int
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

class UserByName(UserBase):
    username: str
    
    class Config:
        from_attributes = True

class UserUpdate:
    pass

@dataclass
class request_body():
    input_text :  str
