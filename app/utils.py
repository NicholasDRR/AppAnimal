import re 
from fastapi import status, HTTPException


dict_regex = {
    "object_id pattern": r"^[0-9a-fA-F]{24}$",
    "gender pattern": r"male|female",
    "neutering pattern": r"spayed|neutered",
    "date pattern": r"^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$"
    
}


def validate_id(id: int):
    
    if not re.match(dict_regex["object_id pattern"], id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail={"msg": "Invalid id!"})