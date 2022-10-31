const {app,BrowserWindow}  = require('electron');
const url = require('url');
const path = require('path');
//Nuevo
const {ipcMain} = require('electron');


app.on('before-quit', ()=> {
   console.log('Saliendo...');
});


let win;

function createWindow(){
    win =  new BrowserWindow({
         width: 800,
         height: 600,
         title: 'IPCMAIN-IPCRENDERER',
         center: true,
         minimizable:false,
         webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
         }
    });

    win.loadURL(
        url.format({
           pathname: path.join(__dirname,'index.html'),
           protocol: 'file',
           slashes:true
        })
    );

}

//Async-Await 


//Todo método que tiene un await significa 
//que va esperar a que le regrese la respuesta 

//Sincrono
ipcMain.on('sincrono-mensaje',(event, args) => {

 //TODO: Lo que tiene de argumentos
 console.log('Lo que tiene de argumentos');
 console.log(args);

 event.returnValue = 'Sincrono, Hola a todos';
});


//Asincrono
ipcMain.on('asincrono-mensaje',(event, args) => {

   //TODO: Lo que tiene de argumentos
   console.log('Lo que tiene de argumentos');
   console.log(args);
  
   event.sender.send('asincrono-respuesta',
   'Asincrono hola a todos');
  });

//TODO: Se crea el objeto Window y se muestra
  app.on('ready', createWindow);