//Desestructuracion de objetos
const {app, BrowserWindow, Menu, MenuItem, ipcMain}  =  require('electron');
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
        maximizable: false, 
        webPreferences:{
            nodeIntegration:true, 
            contextIsolation: false
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

const templateMenu = [
     {
        label: 'File',
        submenu: [
            isMac ? { role: 'close'}: {role : 'quit'},
            {
                label:'Ayuda',
                click: ()=> {
                    //alert('Hola desde ayuda');
                    var wind = new BrowserWindow();
                        wind.loadURL('https://www.google.com')
                        wind.show();
                }
          }
        ]
     }, //Termina un menú
     {  // Aqui comienza otro
       label: 'Editar',
       submenu: [
        {
            role:'undo'
        },
        {
            role: 'redo'
        },
        {
            type:'separator'
        },
        {
            role: 'cut'
        }
       ]  
     },
     {
        label: 'Vista',
        submenu: [
            {
                role: 'reload'
            },
            {
                role: 'toggledevtools'
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
            label: 'Menu item 1',
            click: () => {
                event.sender.send('context-menu-command','menu-item-1')
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Menu item 2',
            type: 'checkbox',
            checked:true
        }
    ];

    const menu =  Menu.buildFromTemplate(template);
    menu.popup(BrowserWindow.fromWebContents(event.sender));
});



const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);


app.on('ready', createWindow);