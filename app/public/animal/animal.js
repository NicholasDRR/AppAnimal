var image_data = "";


function anexImage() {
    const anexed = document.getElementById('clickhere')
    anexed.innerHTML = 'Attached image'

}


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

        if(document.getElementById('image').files[0]){
            await convertToBinary();
        }


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


            
        if (image_data === "") {
            alert("Select an image before sending the form.");
            return false; 
        }

        try {
            await axios.post('http://127.0.0.1:8000/animal/register', {
                name: animal_name,
                birthday: animal_birthday.replaceAll('/', '-'),
                breed: animal_breed,
                gender: animal_gender,
                neutering: animal_neutering,
                weight: animal_weight,
                image: image_data
            });
        } catch (error) {
            console.error(error);
        }
        alert("Animal created")

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
