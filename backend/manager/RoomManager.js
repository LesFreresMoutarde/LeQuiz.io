const socketEngine = require('socket.io');

module.exports = (server) => {

    const rooms = [];

    const io = socketEngine(server, {
        cors: {
            origin: 'http://localhost',
        }
    });


 io.on('connection', (socket) => {

     console.log('user has connected');

     socket.on('join', ({roomId, pseudo, isHost}) => {
         console.log('roomId', roomId);
         console.log('pseudo', pseudo);

         if (isHost)  {
             console.log('c lhost');
             // Creer lobjet Room
         }


         socket.emit('connection-success')


         // Envoyer tous les joueurs


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