import pymongo

def connect_mongo():
    
    client = pymongo.MongoClient('mongodb://localhost:27017')

    mydb = client['AppAnimal']

    collection = mydb['Animals']

    information = mydb.dataanimals

    return collection



