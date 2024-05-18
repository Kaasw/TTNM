from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas import DocumentById, DocumentCreate, DocumentUpdate
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from sqlalchemy.exc import SQLAlchemyError
from api import deps
from security import manager
import logging
import crud
import sqlalchemy
import model

router = APIRouter()

@router.post("/", response_model=DocumentById)
def create_document(document_in: DocumentCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.document.create(db, obj_in=document_in)
    except SQLAlchemyError as e:
            error = str(e),
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error,
            )

@router.get("/by_user/{user_id}", response_model=List[DocumentById])
def get_order_by_customer(user_id: int, db: Session = Depends(deps.get_db)):
    document = crud.documentInteract.get_by_user(db, user_id=user_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with user ID {user_id} not found",
        )
    
    try :
        return document
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )





