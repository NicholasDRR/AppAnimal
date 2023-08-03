function manipulateForm(){

    const animal_form = document.getElementById('animals-form')
    const input_name = document.getElementById('name')
    const input_age = document.getElementById('age')

    var input_gender = document.getElementsByName('gender')

    const input_color = document.getElementById('color')


    animal_form.onsubmit = async (event) => {

        //event.preventDefault()

        const animal_name = input_name.value
        const animal_age = input_age.value

        for (var i = 0; i < input_gender.length; i++) {
            if (input_gender[i].checked) {
                var animal_gender = input_gender[i].value
            }}

        
        const animal_color = input_color.value

        await axios.post('http://127.0.0.1:8000/animal', {
            name: animal_name,
            age: animal_age,
            gender: animal_gender,
            color: animal_color,
        })

    }
}


async function loadAnimals(){

    const response = await axios.get('http://127.0.0.1:8000/animal')
    const animals = response.data
    const animals_list = document.getElementById('animals-list')

    //animals_list.innerHTML = ''

    animals.forEach(animal => {

        const item = document.createElement('li')

        const row = `${animal._id} - ${animal.name} - ${animal.age} - ${animal.gender} - ${animal.color}`

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

        animals_searched.innerHTML = '' // Limpando listagem

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


function deleteAnimal(){

    const delete_form = document.getElementById('delete-form')
    const input_id = document.getElementById('search-delete')

    delete_form.onsubmit = async (event) => {

        const id = input_id.value
        await axios.delete(`http://127.0.0.1:8000/animal?id=${id}`)

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

        await axios.put(`http://127.0.0.1:8000/animal/${update_id}`, {
            name: update_animal_name,
            age: update_animal_age,
            gender: update_animal_gender,
            color: update_animal_color,
        })

    }

}



function app(){
    manipulateForm()
    loadAnimals()
    searchAnimal()
    deleteAnimal()
    updateAnimal()
}

app()




