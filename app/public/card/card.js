var urlParams;
var idParam;

function toTitleCase(text) {
    return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

function redirectToUpdate() {

    urlParams = new URLSearchParams(window.location.search);
    idParam = urlParams.get('id');
    const redirectButtom = document.getElementById('update')
    redirectButtom.setAttribute('href', `/app/public/card/card-edit.html?id=${idParam}`)
}


async function setById(){

    urlParams = new URLSearchParams(window.location.search);
    idParam = urlParams.get('id');

    const response = await axios.get(`http://127.0.0.1:8000/animal/id?id=${idParam}`)
    const animals = response.data

    const animal_image_field = document.getElementById('image')
    animal_image_field.src = 'data:image/jpeg;base64,' + animals.image;

    const animal_name_field = document.getElementById('name')
    animal_name_field.innerHTML = `<strong>Name:</strong> ${toTitleCase(animals.name)}`;

    const animal_birthday_field = document.getElementById('birthday')
    animal_birthday_field.innerHTML = `<strong>Birthday:</strong> ${animals.birthday}`;

    const animal_breed_field = document.getElementById('breed')
    animal_breed_field.innerHTML = `<strong>Breed:</strong> ${toTitleCase(animals.breed)}`;
    
    const animal_gender_field = document.getElementById('gender')
    animal_gender_field.innerHTML = `<strong>Gender:</strong> ${toTitleCase(animals.gender)}`;

    const animal_neutering_field = document.getElementById('neutering')
    animal_neutering_field.innerHTML = `<strong>Neutering:</strong> ${toTitleCase(animals.neutering)}`;

    const animal_weight_field = document.getElementById('weight')
    animal_weight_field.innerHTML = `<strong>Weight:</strong> ${animals.weight}`;


}

function deleteAnimal(){

    try {
        axios.delete(`http://127.0.0.1:8000/animal/delete?id=${idParam}`);
    } catch (error) {
        console.error(error);
    }
    window.location.href = "/app/public/list-animal/list-animal.html";
    alert("Animal deleted")
}

setById()