from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from .user import Base
# from .base import Base

class Document(Base):
    __tablename__ = 'document'

    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(Text(16000000), nullable=False)
    summary = Column(Text(16000000), nullable=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    user = relationship('User', back_populates='document')

