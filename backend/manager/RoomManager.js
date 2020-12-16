const GameUtil = require("../util/GameUtil");

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

        const player = handleNewPlayer(username, socket.id);
        console.log(player);

       // let room = findRoom()

        console.log('tous les joueurs', players);

        // Verifier si roomExiste // Si elle existe pas, on la créer dans isHost // Si il est pas host ca degage
        const {room, joined} = handleRoomJoining(roomId, isHost, player);

        if (!joined) {
            // Emettre event pour dire que ca a fail,
            socket.emit('connection-failure')
        } else {
            socket.join(room.id);
            socket.emit('connection-success');
            console.log("temoinnito")
            io.to(room.id).emit('room-updated', room);
        }

         // Envoyer tous les joueurs
            //.emit('updated-room', JSON.stringify(room));

         socket.on('disconnect', () => {
             console.log('deconnexion')
             console.log('player', player);
             console.log("la room", room);

             const hasRoomToBeUpdated = handlePlayerDisconnect(player, room);

             if (hasRoomToBeUpdated) io.to(room.id).emit('room-updated', room);
         })

     })


     const handleNewPlayer = (username, socketId) => {
        let player = findPlayer(username);

         if (player.length === 0) player = createPlayer(username, socketId)

         else player = player[0];

         return player;
     };

    const findPlayer = (username) => {
        return players.filter(player => player.username === username)
    };

    const createPlayer = (username, socketId) => {
        const player = {
            username,
            socketId
        };

        players.push(player);
        return player;
    };


    const handleRoomJoining = (roomId, isHost, player) => {
        // Verifier si roomExiste
        // Si elle existe pas, on la créer dans isHost
        // Si il est pas host ca degage
        let joined = false;
        let room = findRoom(roomId);

        if (room.length > 0) {
            room = room[0]
            joined = playerJoinRoom(player, room);
            //return room;

        } else {

            room = null;

            if (isHost) {
                room = createRoom(roomId, player);
                joined = true
            }
        }

        return {room, joined};
    }

    const findRoom = (roomId) => {
         return rooms.filter(room => room.id === roomId)
    };

    const createRoom = (roomId, host) => {
       const room = {
           id: roomId,
           host,
           players: [host],
       }

       rooms.push(room);

       return room;
    };

    const playerJoinRoom = (player, room) => {

        if (room.players.length > 8) {
            return false
        }

        room.players.push(player);
        return true;
    };

    const handlePlayerDisconnect = (player, room) => {
        if (room) {
            //console.log(room);
            playerLeaveRoom(player, room);

            const isRoomDeletable = checkIfRoomIsDeletable(room);
            if (isRoomDeletable)  {
                deleteRoom(room);
                return false;
            }

            const hostHasToBeTransferred = checkIfHostHasToBeTransferred(player, room);
            if (hostHasToBeTransferred) changeRoomHost(room)

        }

        deletePlayer(player);
        return true;

        // console.log('tableau des joueurs après', players);
        // console.log('tableau des rooms après', rooms);
    };


    const playerLeaveRoom = (player, room) => {
       let index = -1;

        room.players.forEach((playerInRoom, i) => {
            if (playerInRoom.socketId === player.socketId) index = i;
        });

        room.players.splice(index, 1);
    };

    const checkIfRoomIsDeletable = (room) => {
        return room.players.length === 0;
    };

    const deleteRoom = (room) => {
        console.log('on va delete la room');
        let index = -1;

        rooms.forEach((activeRoom, i) => {
            if (activeRoom.id === room.id) index = i;
        });

        rooms.splice(index, 1);

        index = GameUtil.ROOMS_ID.indexOf(room.id);
        GameUtil.ROOMS_ID.splice(index, 1);
    };

    const checkIfHostHasToBeTransferred = (player, room) => {
        return room.host.socketId === player.socketId;
    };

    const changeRoomHost = (room) => {
        room.host = room.players[0];
    };

    const deletePlayer = (player) => {
        let index = -1;
        players.forEach((activePlayer, i) => {
            if (activePlayer.socketId === player.socketId) index = i;
        });

        players.splice(index, 1);
    }


     /*setInterval(() => {

         socket.emit('test', `${new Date().toISOString()}`);
     }, 1000);*/


     //TODO Handle socket.on('error')
 })

};