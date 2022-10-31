//Desestructuracion de objetos
const {app, BrowserWindow}  =  require('electron');
const url = require('url');
const path  = require('path');
const {ipcMain} = require('electron');
const {dialog} = require('electron');
const {systemPreferences} = require('electron');
const fs = require('fs');


app.on('before-quit',  ()=> {
   console.log('Saliendo...');
});

//VAR, LET, CONST
var win;

//< ES5
//createWindow = function(){ }

//ES6
 createWindow =async () => {

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

  const success =  await  systemPreferences.askForMediaAccess('camera');
  console.log(success);
}

//Async-Await 


ipcMain.on('openFile', async (event, args)=> {
    
    const  chosenFolders =  await dialog.showOpenDialog(win,{properties:['openDirectory','openFile']});
    var pathFile  =  chosenFolders.filePaths[0];

    fs.readFile(pathFile,'utf8',(err, data)=> {
        if(err) {
            dialog.showMessageBox(win, {
                message:'Error al leer el archivo seleccionado',
                buttons: ['Aceptar']
            });
            return;
        }
        event.sender.send('datosarchivo',data); //IpcRenderer
    });

});


ipcMain.on('openFileImg', async (event, args)=> {
    
    const  chosenFolders =  await dialog.showOpenDialog(win,{properties:['openDirectory','openFile']});
    var pathFile  =  chosenFolders.filePaths[0];

    fs.readFile(pathFile,(err, data)=> {
        if(err) {
            dialog.showMessageBox(win, {
                message:'Error al leer el archivo seleccionado',
                buttons: ['Aceptar']
            });
            return;
        }

        var newPath = __dirname+'/uploads/'+path.basename(pathFile);
         fs.writeFile(newPath, data, (err) => {
            console.log(err);
         });
        event.sender.send('nuevoarchivo',newPath); //ipcRenderer
    });

});

ipcMain.on('saveFile',async (event, args)=> {
  
    var path  =  await dialog.showSaveDialog(win,{properties:[]});

    fs.writeFile(path.filePath, args, (err)=> {
        if(err){
            console.log(err);
        }
    });
  
});

app.on('ready', createWindow);