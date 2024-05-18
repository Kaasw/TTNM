from sqlalchemy import create_engine
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
import mysql.connector
import pymysql
import models
import os
from models.user import User, Base
from models.document import Base as BaseDocument

load_dotenv()

username = os.getenv("MYSQL_USER")

password = os.getenv("MYSQL_PASSWORD")

host = os.getenv("MYSQL_SERVICE_HOST")

port = os.getenv("MYSQL_SERVICE_PORT")

database = os.getenv("MYSQL_DATABASE")


SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://root:12345678@localhost:3306/ttnm"



engine = create_engine(SQLALCHEMY_DATABASE_URL)
if not database_exists(engine.url):
    create_database(engine.url)


Base.metadata.create_all(engine)


print(database_exists(engine.url))


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()