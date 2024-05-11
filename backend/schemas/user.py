# Pydantic model

from pydantic import BaseModel

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

class UserUpdate:
    pass


