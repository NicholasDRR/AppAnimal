# AppAnimal
CRUD API MONGODB

### Criando e rodando banco

```bash
cd Docker-AppAnimal
sudo docker build -f Dockerfile-db -t mongo_appanimal .
sudo docker run -d --name mongo_appanimal -v appanimal_db -p 27018:27017 mongo

```

### Rodando

```bash
sudo docker start mongo_appanimal
```

## Video
Publicação: [**Linkedin**](https://www.linkedin.com/feed/update/urn:li:activity:7107108080730914816/).


## Credits

This project uses the following third-party template/resource:

- [Pupassure Sign Up Form - Day 5 - 100 DAYS - 2020](https://codepen.io/rickyeckhardt/pen/oNXeoZp) for **Ricky Eckhardt**
- [Named scroll-timeline vertical](https://codepen.io/utilitybend/pen/VwBRNwm) for **Utilitybend**


