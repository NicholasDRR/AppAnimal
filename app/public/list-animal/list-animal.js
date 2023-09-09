async function loadAnimals(){

    const response = await axios.get('http://127.0.0.1:8000/animal')
    const animals = response.data
    const animals_list = document.getElementById('animals-list')

    animals.forEach(animal => {

        
        const item = document.createElement('li');
        const link = document.createElement('a');
    
        link.href = `/app/public/card/card.html?id=${animal._id}`;
        link.innerText = animal.name;
    
        item.appendChild(link);
        animals_list.appendChild(item);
    });
}

loadAnimals()