const {app, BrowserWindow, globalShortcut} = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
   win = new BrowserWindow(
      {   width: 800,
          height: 600,
          webPreferences: {
            nodeIntegration:true,
            enableRemoteModule: true,
            webviewTag:true
          }
      })
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

app.on('browser-window-created',function(e,window) {
   window.setMenu(null);
});

const { Menu, Tray } = require('electron')

let tray = null
app.whenReady().then(() => {
  let tray = new Tray(path.join('','icono.png'))
  const trayMenuTemplate = [
    {
       label: 'Empty Application',
       enabled: false
    },
    
    {
       label: 'Settings',
       click: function () {
          console.log("Clicked on settings")
       }
    },
    
    {
       label: 'Help',
       click: function () {
          console.log("Clicked on Help")
       }
    }
 ];

  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

})

app.on('ready', createWindow)