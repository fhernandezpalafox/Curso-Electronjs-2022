var $ =  require('jquery');
var count = 0;

//JS Estandar
/* 
var clickCounter = document.getElementById('click-counter');
     clickCounter.innerHTML = count.toString();
*/

//Jquery - bondades de utilizar un framework de JS (Jquery, Vuejs, Angular, React, Svelt)
$('#click-counter').text(count.toString());

//Jquery
$('#countbtn').on('click', ()=> {
    count ++;
    $('#click-counter').text(count.toString()); 
});

//JS Estandar 



