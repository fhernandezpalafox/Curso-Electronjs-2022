//Desestructuracion de objetos
const {app, BrowserWindow, dialog}  =  require('electron');
const url = require('url');
const path  = require('path');

const fs =  require('fs');
const {ipcMain} =  require('electron');

app.on('before-quit',  ()=> {
   console.log('Saliendo...');
});

let win;

createWindow = function(){

    win =  new BrowserWindow({
        width: 800, 
        height: 600, 
        title: 'Cuarta aplicacion - Bootstrap',
        center: true, 
        maximizable: false, 
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true,
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


ipcMain.on('saveFile', async (event,imgBuffer) => {
 
    var path = await dialog.showSaveDialog(win, null || {properties:[]});

    fs.writeFile(path.filePath, imgBuffer.data,(err) => {
      if(err){
         console.log(err);
      }
    });

});


app.on('ready', createWindow);