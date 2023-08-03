from app.DDL import dao
from app.models.models_animal import Animal
from fastapi import APIRouter
from bson.objectid import ObjectId

router = APIRouter(
    prefix="/animal",
)


@router.get("/")
def show_animals():
     
    animals = [] 
    collection = dao.connect_mongo()
    
    for item in collection.find({}):
        
        item['_id'] = str(item['_id'])
        animals.append(item)
    
    
    return animals

    
@router.post("/")
def create_animal(animal: Animal):
    
    collection = dao.connect_mongo()
    
    try:
        collection.insert_one(dict(animal))
        
    except Exception as error:
        return str(error)
    
    
@router.get('/{id}')
def show_animal_by_id(id: str):
    
    collection = dao.connect_mongo()
    animal = []
    
    for item in collection.find({}):
        item['_id'] = str(item['_id'])
        if item['_id'] == id:
            animal.append(item)
        
    return animal


@router.delete('/')
def delete_animal_by_id(id: str):
    
    collection = dao.connect_mongo()
    
    try:
        
        for item in collection.find({}):
            
            item['_id'] = str(item['_id'])
            if item['_id'] == id:
               
                collection.delete_one({'_id': ObjectId(id)})
                animals =[]

        return f'Animal deleted'
    
    except Exception as error:
        return str(error)
                    
            
@router.put('/{id}')
def update_animal_by_id(id: str, animal: Animal):
    
    collection = dao.connect_mongo()
    
    id_object = ObjectId(id)
    change_animal = dict(animal)
    
    result = collection.update_one({"_id": id_object}, {"$set": change_animal})

    if result.modified_count > 0:
        return f"Documento atualizado com sucesso: {result.raw_result}"
    else:
        return f"Nenhum documento foi atualizado."