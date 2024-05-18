from fastapi import APIRouter
from .routes import user
from .routes import auth
from .routes import document
# from .routes import speech

api_router = APIRouter()
api_router.include_router(user.router, prefix="/users", tags=["users"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(document.router, prefix="/document", tags=["document"])




