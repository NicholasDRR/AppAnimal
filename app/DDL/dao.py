import pymongo
from dotenv import load_dotenv
import os
from fastapi import APIRouter, status, HTTPException

load_dotenv()

HOST = os.getenv("HOST")
DB = os.getenv("DATABASE")
COLLECTION = os.getenv("COLLECTION")


def connect_mongo():
    
    
    try:
        client = pymongo.MongoClient(HOST)
        mydb = client[DB]
        collection = mydb[COLLECTION]
    
    except Exception as error:
        client.close()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": str(error)})
        
    else:
        return client, collection



