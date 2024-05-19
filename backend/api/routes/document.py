from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas import DocumentById, DocumentCreate, DocumentUpdate, request_body
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
def create_document(document_in: DocumentCreate,db: Session = Depends(deps.get_db)):
    input_model = document_in.content.replace('\n', ' ')
    summary = model.summarize(input_model)
    document_in.summary = summary
    try:
        return crud.document.create(db, obj_in=document_in)
    except SQLAlchemyError as e:
            error = str(e),
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error,
            )

@router.get("/by_user/{user_id}", response_model=List[DocumentById])
def get_document_by_user(user_id: int, db: Session = Depends(deps.get_db)):
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

@router.get("/{document_id}", response_model=DocumentById)
def get_document_by_id(document_id: int, db: Session = Depends(deps.get_db)):
    document = crud.document.get(db, id=document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with ID {document_id} not found",
        )
    return document

@router.get("/", response_model=List[DocumentById])
def get_all_document(db: Session = Depends(deps.get_db)):
    return crud.document.get_all(db)


@router.post('/predict', response_model=request_body)
def predict(data: request_body):
    input_model = data.input_text.replace('\n', ' ')  # Remove line breaks
    output = model.summarize(input_model)
    res = request_body(input_text=output)
    return res