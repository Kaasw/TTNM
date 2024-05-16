from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import APIRouter, Request
from api.base import api_router
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from fastapi.exception_handlers import request_validation_exception_handler
from fastapi.encoders import jsonable_encoder
import model
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix="/api")
app.mount("/api", api_router, name="api")



@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    return FileResponse("../frontend/build/index.html")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    # uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
