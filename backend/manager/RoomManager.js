const socketEngine = require('socket.io');

module.exports = (server) => {

    const rooms = [];

    const players = [{username: 'toto'}];

    const io = socketEngine(server, {
        cors: {
            origin: 'http://localhost',
        }
    });


 io.on('connection', (socket) => {

     console.log('user has connected');

     socket.on('join', ({roomId, username, isHost}) => {
        console.log('roomId', roomId);
        console.log('pseudo', username);

        let player = findPlayer(username);

        if (player.length === 0) {
          player = createPlayer(username, socket.id)
        }

        console.log('tous les joueurs', players);

         if (isHost)  {
             console.log('c lhost');
             console.log('socketId', socket.id);

             // Creer lobjet Room
             const room = {
                 host: player

             }
         } else {
             console.log('pas l host')
         }


         socket.emit('connection-success')


         // Envoyer tous les joueurs


         socket.on('disconnect', () => {
             console.log('deconnexion')
         })

     })


    const findPlayer = (username) => {
        return players.filter(player => player.username ===  username)
    }

    const createPlayer = (username, socketId) => {
        const player = {
            username,
            socketId
        };

        players.push(player);
    }


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