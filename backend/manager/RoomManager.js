const socketEngine = require('socket.io');

module.exports = (server) => {

 const io = socketEngine(server, {
     cors: {
         origin: 'http://localhost',
     }
 });


 io.on('connection', () => {
     console.log('user has connected');
 })

};