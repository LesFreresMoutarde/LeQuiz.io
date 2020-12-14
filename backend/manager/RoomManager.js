const socketEngine = require('socket.io');

module.exports = (server) => {

 const io = socketEngine(server, {
     cors: {
         origin: 'http://localhost',
     }
 });


 io.on('connection', (socket) => {
     console.log('user has connected');

     socket.on('join', (roomId) => {
         console.log('roomId', roomId);
         socket.emit('connection-success')
     })

     //console.log("la socket",socket)
     //Soket join etc
     // Comment récup le code room generé
     /*setInterval(() => {

         socket.emit('test', `${new Date().toISOString()}`);
     }, 1000);*/


     //socket.emit('test')

     //TODO Handle socket.on('error')
 })

};