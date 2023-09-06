# AppAnimal
CRUD API MONGODB

### Criando e rodando banco

```bash
cd Docker-AppAnimal
sudo docker build -f Dockerfile-db -t mongo_appanimal .
sudo docker run -d --name mongo_appanimal -v appanimal_db -p 27017:27017 mongo

```

### Rodando

```bash
sudo docker start mongo_appanimal
```
