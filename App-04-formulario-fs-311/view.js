var $ = require('jquery'); //JQUERY
var fs = require('fs'); //NODEJS

const fileName = 'Contactos.txt';
var numero = 0;

$('#addcontact').on('click', ()=> {
 let nombre =  $('#txtNombre').val();
 let correo = $('#txtCorreo').val();

 //Async-Await
 fs.appendFileSync(fileName,nombre+','+correo+'\n');

 //TODO funcion para llenar la tabla mediante html
 addContact(nombre, correo);

});

function addContact(nombre, correo){

    if(nombre && correo){
        numero++;
        //ES6
        //interpolación de strings
        let estructuraHTML = `<tr>
                                <td>${numero}</td>
                                <td>${nombre}</td>
                                <td>${correo}</td>
                            </tr>`;
        $('#contact-table').append(estructuraHTML);                            

    }
}