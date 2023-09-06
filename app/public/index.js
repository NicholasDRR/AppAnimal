function createAnimal(){
    
    const animal_form = document.getElementById('animals-form')
    const input_name = document.getElementById('pets-name')
    const input_breed = document.getElementById('pets-breed')
    const input_birthday= document.getElementById('pets-birthday')
    var input_gender = document.getElementsByName('pet-gender')
    var input_neutering = document.getElementsByName('spayed-neutered')
    var input_weight = document.getElementsByName('pet-weight')


    animal_form.onsubmit = async (event) => {

        event.preventDefault();

        const animal_name = input_name.value
        const animal_breed = input_breed.value
        const animal_birthday = input_birthday.value

        for (var i = 0; i < input_gender.length; i++) {
            if (input_gender[i].checked) {
                var animal_gender = input_gender[i].value
            }}

        for (var i = 0; i < input_neutering.length; i++) {
            if (input_neutering[i].checked) {
                var animal_neutering = input_neutering[i].value
            }}

        for (var i = 0; i < input_weight.length; i++) {
            if (input_weight[i].checked) {
                var animal_weight = input_weight[i].value
            }}
   
        await axios.post('http://127.0.0.1:8000/animal/register', {
            name: animal_name,
            birthday: animal_birthday,
            breed: animal_breed,
            gender: animal_gender,
            neutering: animal_neutering,
            weight: animal_weight
        })

    }
}


async function loadAnimals(){

    const response = await axios.get('http://127.0.0.1:8000/animal')
    const animals = response.data
    const animals_list = document.getElementById('animals-list')

    animals.forEach(animal => {

        const item = document.createElement('li')

        const row = `${animal.name}`

        item.innerText = row
    
        animals_list.appendChild(item)
    });
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

            console.log(animal.name)

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


function deleteAnimal(){

    const delete_form = document.getElementById('delete-form')
    const input_id = document.getElementById('search-delete')

    delete_form.onsubmit = async (event) => {

        const id = input_id.value
        await axios.delete(`http://127.0.0.1:8000/animal/delete?id=${id}`)

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


function app(){
    loadAnimals()
    createAnimal()
    searchAnimal()
    deleteAnimal()
    updateAnimal()
}


app()
