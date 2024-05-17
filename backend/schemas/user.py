# Pydantic model

from pydantic import BaseModel
from dataclasses import dataclass
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserById(UserBase):
    id: int
    
    class Config:
        orm_mode = True 

class UserLogin(BaseModel):
    username: str
    password: str

class UserByName(UserBase):
    username: str
    
    class Config:
        from_attributes = True

class UserUpdate:
    pass

class request_body(BaseModel):
    input_text :  str
