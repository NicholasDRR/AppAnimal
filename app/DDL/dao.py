import pymongo
from dotenv import load_dotenv
import os

load_dotenv()

HOST = os.getenv("HOST")
DB = os.getenv("DATABASE")
COLLECTION = os.getenv("COLLECTION")


def connect_mongo():
    
    client = pymongo.MongoClient(HOST)

    mydb = client[DB]

    collection = mydb[COLLECTION]


    return collection



