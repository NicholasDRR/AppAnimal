var image_data = "";
var urlParams;
var idParam;


function anexImage() {
    const anexed = document.getElementById('clickhere')
    anexed.innerHTML = 'Attached image'

}

function updateAnimal(){

    urlParams = new URLSearchParams(window.location.search);
    idParam = urlParams.get('id');

    const update_form = document.getElementById('update-form')
    const input_update_name = document.getElementById('update-name')
    const input_update_breed = document.getElementById('update-breed')
    const input_update_birthday = document.getElementById('update-birthday')

  
    var input_gender_update = document.getElementsByName('pet-gender-update')
    var input_neutering_update = document.getElementsByName('spayed-neutered-update')
    var input_weight_update = document.getElementsByName('pet-weight-update')

    update_form.onsubmit = async (event) => {

        event.preventDefault();

        if(document.getElementById('image').files[0]){
            await convertToBinary();
        }

        const animal_update_name = input_update_name.value
        const animal_update_breed = input_update_breed.value
        const animal_update_birthday = input_update_birthday.value
        
        for (var i = 0; i < input_gender_update.length; i++) {
            if (input_gender_update[i].checked) {
                var animal_update_gender = input_gender_update[i].value
            }}

        for (var i = 0; i < input_neutering_update.length; i++) {
            if (input_neutering_update[i].checked) {
                var animal_update_neutering = input_neutering_update[i].value
            }}

        for (var i = 0; i < input_weight_update.length; i++) {
            if (input_weight_update[i].checked) {
                var animal_update_weight = input_weight_update[i].value
            }}


        if (image_data === "") {
            alert("Select an image before sending the form.");
            return; 
        }

        try {
            await axios.put(`http://127.0.0.1:8000/animal/update/?id=${idParam}`, {
            name: animal_update_name,
            birthday: animal_update_birthday.replaceAll('/', '-'),
            breed: animal_update_breed,
            gender: animal_update_gender,
            neutering: animal_update_neutering,
            weight: animal_update_weight,
            image: image_data
        }); 
        } catch (error) {
            console.error(error);
        }
        console.log('Animal updated')
        window.location.href = `/app/public/card/card.html?id=${idParam}`;

    }

}


async function convertToBinary(){

    var file = document.getElementById('image').files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file)
    await new Promise(resolve => reader.onload = () => resolve());

    image_seila =  reader.result.toString()
    image_data = btoa(image_seila)
}