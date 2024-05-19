from typing import Type
from crud.base import CRUDBase, DocumentCRUD
from schemas import DocumentById, DocumentCreate, DocumentUpdate
from models import Document


class CRUDDocument(CRUDBase[DocumentById, DocumentCreate, DocumentUpdate]):
    pass

class CRUDDocument_Type(DocumentCRUD):
    pass


document = CRUDDocument(Document)
documentInteract = CRUDDocument_Type(Document)