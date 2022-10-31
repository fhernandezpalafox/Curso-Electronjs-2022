//Desestructuracion de objetos
const {app, Menu, BrowserWindow, ipcMain}  =  require('electron')
const url = require('url');
const path  = require('path');

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
        title: 'Menú aplicación',
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

const isMac = process.platform === 'darwin';

const teamplateMenu = [
 {
    label: 'Archivo',
    submenu: [
        isMac ? {role: 'close'}:{role:'quit'},{label:'ayuda'}
    ]
 },
 {
    label: 'Editar',
    submenu: [
       {
         role: 'undo'
       },
       {
        role: 'redo'
       },
       {
        type:'separator'
       },
       {
        role: 'cut'
       },
       {
        role: 'copy'
       },
       {
        role: 'paste'
       }
    ]
 },
 {
    label:'Vista',
    submenu: [
        {
            role:'reload'
        },
        {
            role:'toggledevtools'
        },
        {
            role: 'help'
        }
    ]
 }

];


ipcMain.on('show-context-menu', (event) => {
    const template = [
      {
        label: 'Menu Item 1',
        click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
      },
      { type: 'separator' },
      { label: 'Menu Item 2', type: 'checkbox', checked: true }
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup(BrowserWindow.fromWebContents(event.sender))
  })

const menu  =  Menu.buildFromTemplate(teamplateMenu);
Menu.setApplicationMenu(menu);

app.on('ready', createWindow);