from fastapi import APIRouter
from .routes import user
from .routes import auth

api_router = APIRouter()
api_router.include_router(user.router, prefix="/users", tags=["users"])



