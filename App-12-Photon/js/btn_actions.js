(function(){
   
    const {ipcRenderer} = require('electron');

     function init(){
     
        document.getElementById('min-btn').addEventListener('click', function(e) {
            ipcRenderer.send('minimize');
        });

        document.getElementById('max-btn').addEventListener('click', function(e) {

             ipcRenderer.send('isMaximized');
           
           
        });

        document.getElementById('close-btn').addEventListener('click', function(e) {
             ipcRenderer.send('close');
        });
        

    }
    

    document.onreadystatechange =  function(){
      
        if(document.readyState == 'complete')
         {
            init();
         }

    }


})();
//window.onload