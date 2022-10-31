const {app, BrowserWindow} = require('electron'); //Electron
const url  = require('url');//NodeJS
const path =  require('path'); //NodeJS

app.on('before-quit', ()=>{
   console.log('Saliendo ..,');
});

let win;


createWindow = function(){
    
    win  =  new BrowserWindow({
            width:800,
            height:600, 
            title: 'Tercer aplicación',
            center:true,
            maximizable:false,
            webPreferences:{
                nodeIntegration:true,
                contextIsolation: false
            }
    });
    
    console.log(__dirname);

    win.loadURL(
        url.format({
           pathname: path.join(__dirname,'index.html'),
            protocol: 'file',
            slashes: true
        })
    );
}

app.on('ready', createWindow);