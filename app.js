const path= require('path');
const express = require('express')
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static('public'));

io.on('connection', (socket) =>{
    console.log('Nueva conexión', socket.id);

    socket.on('key', key =>{
        io.emit('key', key);
    });
});

server.listen(3000, () =>{
    console.log('Servidor en el puerto 3000')
});



