let $ = require('jquery');
let fs =  require('fs'); //NodeJS

let fileName = 'contactos.txt';
let numero = 0;

$('form').on('submit', (event) => {
    event.preventDefault(); //No limpiar los campos de texto  
    let nombre = $('#txtNombre').val();
   //JS Estandar
   //let nombre =  document.getElementById('txtNombre').value; 
   let correo  =  $('#txtCorreo').val();

   //Hacerlo sin ES6 
   //===fs.appendFileSync(fileName,nombre+','+correo+'\n');
   //Hacerlo con ES6
   fs.appendFileSync(fileName,`${nombre},${correo}\n`); 

   // Funcion para llenarlo en el HTML
   addContactHMTL(nombre,correo);
});

//Evento clic - addContact
$('#addContact').on('click', ()=> {
   let nombre = $('#txtNombre').val();
   //JS Estandar
   //let nombre =  document.getElementById('txtNombre').value; 
   let correo  =  $('#txtCorreo').val();

   //Hacerlo sin ES6 
   //===fs.appendFileSync(fileName,nombre+','+correo+'\n');
   //Hacerlo con ES6
   fs.appendFileSync(fileName,`${nombre},${correo}\n`); 

   // Funcion para llenarlo en el HTML
   addContactHMTL(nombre,correo);
});

addContactHMTL  = function(nombre,correo){
    if(nombre && correo){
      numero++;
      //ES6
      let estructuraHtml = ` <tr>
                                    <td>${numero}</td>
                                    <td>${nombre}</td>
                                    <td>${correo}</td>
                                </tr>`;
        $('#contact-table').append(estructuraHtml);
        
        //JS Estandar
        //document.getElementById('contact-table').innerHTML = estructuraHtml;
    }
}

//Felipe - objetos
loadContacts =  function() {
    
    //Async-Await
    if(fs.existsSync(fileName)){
        let data = fs.readFileSync(fileName,'utf8').split('\n');

        data.forEach((contacto, index) => {
              
            //Desestructuracion de objetos
            //Yeff,yeff@delasalle.edu.mx  
            let [nombre,correo] = contacto.split(',');

            addContactHMTL(nombre, correo);

        });
    }else 
    {
        fs.writeFile(fileName, '', (err) => {
           if(err){
            console.log(err);
           }
        });
    }


}

loadContacts();

