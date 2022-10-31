const {app,BrowserWindow} =  require('electron');
const url = require('url');
const path = require('path');
const {ipcMain} = require('electron');
const {dialog} = require('electron');
const {systemPreferences} =  require('electron');
const fs = require('fs');

app.on('before-quit', () => {
   console.log('Saliendo ...');
}); 

let win;

async function createWindow () {
    win =  new BrowserWindow({
         width: 800,
         height: 600,
         title: 'Dialogos',
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


    //const success =  await systemPreferences.askForMediaAccess("camera");
    //console.log(success);
}

ipcMain.on('openFile', async (event, args) => {
   
    const choosenFolders = await dialog.showOpenDialog(win,null || {
        properties:['openDirectory','openFile']});
    let pathFile = choosenFolders.filePaths[0];
    
    fs.readFile(pathFile,'utf8',(err, data) => {
       if(err){
          alert('Error al leer el archivo'+err);
          return;
       }
      
       event.sender.send('datosarchivo',data);

    });

});


ipcMain.on('openFileImg', async (event, args) => {
   
    const choosenFolders = await dialog.showOpenDialog(win,null || {
        properties:['openDirectory','openFile']});

    let pathFile = choosenFolders.filePaths[0];
    
    fs.readFile(pathFile,(err, data) => {
      
        let newPath  = __dirname+'/uploads/'+path.basename(pathFile);

        fs.writeFile(newPath,data,function(err){
           console.log(err);
        });
        
      
       event.sender.send('nuevoarchivo',newPath);

    });

});

ipcMain.on('saveFile', async (event,args) => {
    
    var path  =  await dialog.showSaveDialog(win, null, {properties: [] });

    fs.writeFile(path.filePath,args,(err) => {
        if(err){
            console.log(err);
        }
    });

});


app.on('ready', createWindow);

