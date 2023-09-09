async function setById(){

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    const response = await axios.get(`http://127.0.0.1:8000/animal/id?id=${idParam}`)
    const animals = response.data

    const animal_image_field = document.getElementById('image')
    animal_image_field.src = 'data:image/jpeg;base64,' + animals.image;


    const animal_name_field = document.getElementById('name')
    animal_name_field.innerHTML = `<strong>Name:</strong> ${animals.name}`;

    const animal_birthday_field = document.getElementById('birthday')
    animal_birthday_field.innerHTML = `<strong>Age:</strong> ${animals.birthday}`;

    const animal_breed_field = document.getElementById('breed')
    animal_breed_field.innerHTML = `<strong>Breed:</strong> ${animals.breed}`;
    
    const animal_gender_field = document.getElementById('gender')
    animal_gender_field.innerHTML = `<strong>Gender:</strong> ${animals.gender}`;

    const animal_neutering_field = document.getElementById('neutering')
    animal_neutering_field.innerHTML = `<strong>Neutering:</strong> ${animals.neutering}`;

    const animal_weight_field = document.getElementById('weight')
    animal_weight_field.innerHTML = `<strong>Weight:</strong> ${animals.weight}`;

    console.log(typeof(animals))


}

async function searchAnimal(){

    const response = await axios.get('http://127.0.0.1:8000/animal')
    const animals = response.data

    const search_form = document.getElementById('search-form')

    const search = document.getElementById('search-name')

    const animals_searched = document.getElementById('animal-searched')

    search_form.onsubmit = (event) => {

        animals_searched.innerHTML = '' 

        animals.forEach(animal => {

            event.preventDefault()

            if ( animal.name.toUpperCase().indexOf(search.value.toUpperCase())  != -1 ){

                
                const item = document.createElement('li')
                const row = `${animal.name} - ${animal.age} - ${animal.gender} - ${animal.color}`
            
                item.innerText = row
                animals_searched.appendChild(item)
            }
        })
    }

}





function updateAnimal(){

    const update_form = document.getElementById('update-form')
    const input_update_id = document.getElementById('update-id')
    const input_update_name = document.getElementById('update-name')
    const input_update_age = document.getElementById('update-age')

    var input_update_gender = document.getElementsByName('update-gender')

    const input_update_color = document.getElementById('update-color')

    update_form.onsubmit = async (event) => {

        const update_id = input_update_id.value
        const update_animal_name = input_update_name.value
        const update_animal_age = input_update_age.value

        for (var i = 0; i < input_update_gender.length; i++) {
            if (input_update_gender[i].checked) {
                var update_animal_gender = input_update_gender[i].value
            }}

        
        const update_animal_color = input_update_color.value

        await axios.put(`http://127.0.0.1:8000/animal/update/?id=${update_id}`, {
            name: update_animal_name,
            age: update_animal_age,
            gender: update_animal_gender,
            color: update_animal_color,
        })

    }

}


//function app(){
//    loadAnimals()
//    //createAnimal()
//    //searchAnimal()
//    //deleteAnimal()
//    //updateAnimal()
//    setById()
//}
//
//
//app()
