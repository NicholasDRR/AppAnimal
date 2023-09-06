import re 
from fastapi import status, HTTPException


object_id_pattern = r"^[0-9a-fA-F]{24}$"


def validate_id(id: int):
    
    if not re.match(object_id_pattern, id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail={"msg": "Invalid id!"})