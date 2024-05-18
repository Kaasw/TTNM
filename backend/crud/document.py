from typing import Type
from crud.base import CRUDBase, DocumentCRUD
from schemas import DocumentById, DocumentCreate, DocumentUpdate
from models import Document


class CRUDUser(CRUDBase[DocumentById, DocumentCreate, DocumentUpdate]):
    pass

class CRUDDocument_Type(DocumentCRUD):
    pass


document = CRUDUser(Document)
documentInteract = CRUDDocument_Type(Document)