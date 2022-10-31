//Desestructuracion de objetos
const {app, BrowserWindow, ipcMain}  =  require('electron');
const url = require('url');
const path  = require('path');

app.on('before-quit',  ()=> {
   console.log('Saliendo...');
});

let win;

createWindow = function(){

    win =  new BrowserWindow({
        width: 800, 
        height: 600, 
        title: '...',
        center: true, 
        frame:false,
        maximizable: false, 
        webPreferences:{
            nodeIntegration:true, 
            contextIsolation: false,
            enableRemoteModule:true
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

//Windows no para Mac
app.on('browser-window-created', (e,window) => {
    window.setMenu(null);
});

ipcMain.on('maximize', () => {
    BrowserWindow.getFocusedWindow()?.maximize();
  });

  ipcMain.on('unmaximize', () => {
    BrowserWindow.getFocusedWindow()?.unmaximize();
  });

  ipcMain.on('isMaximized', (event) => {
    if(!BrowserWindow.getFocusedWindow()?.isMaximized()){
        BrowserWindow.getFocusedWindow()?.maximize();
    }else{
        BrowserWindow.getFocusedWindow()?.unmaximize();
    }
    event.returnValue = BrowserWindow.getFocusedWindow()?.isMaximized();
  });

  ipcMain.on('minimize', () => {
    BrowserWindow.getFocusedWindow()?.minimize();
  });

  ipcMain.on('close', () => {
    BrowserWindow.getFocusedWindow()?.close();
  });

app.on('ready', createWindow);