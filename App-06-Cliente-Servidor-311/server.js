var net  = require('net');

//ES6
var server =  net.createServer((connection) => {
    
    console.log('Cliente conectado');

    connection.on('end', () => {
       console.log('Cliente desconectado');
    });
    
    connection.write('Hola alumnos del 311');
    connection.pipe(connection);

});


server.listen(8080, ()=> {
   console.log('El servidor se esta ejecutando');
});
