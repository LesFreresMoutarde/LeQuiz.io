const socketIo = require('socket.io');

module.exports = (server) => {

 const io = socketIo(server, {
     cors: {
         origin: 'http://localhost',
     }
 });


 io.on('connection', () => {
     console.log('enfoire !!!');
 })

};