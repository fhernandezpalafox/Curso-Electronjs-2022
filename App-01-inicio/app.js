const {app, BrowserWindow} =  require('electron');

//console.log(app);

app.on('before-quit', ()=> {
    console.log('Saliendo...');
});

//var, const, let

app.on('ready', ()=> {

    let win = new BrowserWindow({
        width:800,
        height:600,
        title: 'Primera aplicación',
        center:true,
        maximizable: false,
        webPreferences: {
            nodeIntegration:true,
            //propiedad
            
        }
    });

    win.on('move', ()=> {
        const position = win.getPosition();

        console.log(position);
    });


    win.on('closed', ()=> {
         app.quit();
    });

});