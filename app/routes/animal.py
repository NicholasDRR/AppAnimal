import base64
from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from bson.objectid import ObjectId

from app.DDL import dao
from app.models.models_animal import Animal
from app.utils import validate_id



router = APIRouter(
    prefix="/animal",
)


@router.get("/")
def show_animals():
     
    client, collection = dao.connect_mongo()
    
    animals = [] 
    
    try:
        for item in collection.find({}):
            item['_id'] = str(item['_id'])
            animals.append(item)
            
    except Exception as error:
        client.close()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": str(error)})
    
    else:
        client.close()
        return JSONResponse(status_code=status.HTTP_200_OK, content=animals)
        
    
@router.post("/register")
async def create_animal(animal: Animal):
    
    client, collection = dao.connect_mongo()
    
    animal.image = base64.b64encode(animal.image.encode()).decode('utf-8')
    
    
    try:
        collection.insert_one(dict(animal))
        
    except Exception as error:
        
        client.close()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": str(error)})
    
    else:
        client.close()
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={"msg": "Animal created!"})
    
    
@router.get('/id')
def show_animal_by_id(id: str):
    
    client, collection = dao.connect_mongo()
    
    validate_id(id)
    
    try:
        filter = {'_id': ObjectId(id)}
        item = collection.find_one(filter)
        
            
    except Exception as error:
        client.close()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": str(error)})
    
    else:
        client.close()
        
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "This animal does not exists"})
        
        return JSONResponse(status_code=status.HTTP_200_OK, content=str(item))    
    

@router.delete('/delete')
def delete_animal_by_id(id: str):
    
    client, collection = dao.connect_mongo()
    
    animal_exists = show_animal_by_id(id)
    
    if not animal_exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "This animal does not exists!"})
    
    try:
        collection.delete_one({'_id': ObjectId(id)})

    except Exception as error:
        client.close()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": str(error)})
            
    else:
        client.close()
        
        return JSONResponse(status_code=status.HTTP_200_OK, content={"msg": "Animal deleted!"})        
            
            
@router.put('/update')
def update_animal_by_id(id: str, animal: Animal):
    
    client, collection = dao.connect_mongo()
    
    animal_exists = show_animal_by_id(id)
    
    if not animal_exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "This animal does not exists!"})
    
    change_animal = dict(animal)
    
    try:
        result = collection.update_one({"_id": ObjectId(id)}, {"$set": change_animal})

    except Exception as error:
        client.close()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": str(error)})
            
    else:
        client.close()
        
        if result.modified_count != 0:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"msg": "Animal modified!"})
        else:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": error})
        
        
        
             