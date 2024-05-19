from pydantic import BaseModel

class DocumentBase(BaseModel):
    user_id: int
    content: str
    summary: str

class DocumentCreate(DocumentBase):
    pass
    

class DocumentById(DocumentBase):
    id: int
    
    class Config:
        orm_mode = True 

class DocumentUpdate(DocumentBase):
    pass