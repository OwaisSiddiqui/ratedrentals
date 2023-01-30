from typing import Dict, TypedDict
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from pymongo.database import Database

load_dotenv()

uri = os.getenv("MONGODB_RATEDRENTALS_URI")
db_name = os.getenv("MONGODB_RATEDRENTALS_DB_NAME")

cached_client = None
cached_db = None

class EnvironmentVariableNotDefined(Exception):
    pass

class Connect(TypedDict):
    client: MongoClient
    db: Database

def connect_to_database() -> Connect:
    if cached_client and cached_db:
        return {"client": cached_client, "db": cached_db}
    if not uri:
        raise EnvironmentVariableNotDefined("Please define the MONGODB_RATEDRENTALS_URI environment variable inside .env.local")
    if not db_name:
        raise EnvironmentVariableNotDefined("Please define the MONGODB_RATEDRENTALS_DB_NAME environment variable inside .env.local")
    client = MongoClient(uri)
    db = client[db_name]
    return {"client": client, "db": db}
