//Desestructuracion de objetos
const {app, BrowserWindow}  =  require('electron');
const url = require('url');
const path  = require('path');

const {ipcMain} = require('electron')

app.on('before-quit',  ()=> {
   console.log('Saliendo...');
});

//VAR, LET, CONST
var win;

//< ES5
//createWindow = function(){ }

//ES6
createWindow =() => {

    win =  new BrowserWindow({
        width: 800, 
        height: 600, 
        title: 'Sexta aplicación',
        center: true, 
        maximizable: false, 
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
            
        }
    }); 

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol:'file',
            slashes:true
        })
    );
}

//Async-Await 

//Asincrono
ipcMain.on('asincrono-mensaje',(event, args)=> {
    
    console.log('Lo que tienen los argumentos asincronos');
    console.log(args);

    event.sender.send('asincrono-respuesta','Asincrono hola a todos');
});


//Sincrono
ipcMain.on('sincrono-mensaje',(event, args)=> {
    
    console.log('Lo que tienen los argumentos sincronos');
    console.log(args);

   event.returnValue = 'Sincrono hola a todos';
});

app.on('ready', createWindow);