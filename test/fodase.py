
import requests
import PIL.Image as Image
import io 
import base64


image_path = "/mnt/c/Users/nicho/OneDrive/Imagens/jovem_tranquilao.png"


image_data = open(image_path, 'rb').read()

b_str = str(image_data)
image_base64 = base64.b64encode(image_data).decode('utf-8')
image_base64 = str(base64.b64encode(image_data))



dicto = { 
    "name": "string",
    "birthday": "30-06-3407",
    "breed": "string",
    "gender": "female",
    "neutering": "spayed",
    "weight": "string",
    "image": image_base64
}


#with open("/mnt/c/Users/nicho/OneDrive/Imagens/fodase7.png", 'wb') as f:
#    f.write(base64.b64decode(image_base64))
#   
   
   
fds = requests.post('http://127.0.0.1:8000/animal/register', json=dicto)
print(fds.content)