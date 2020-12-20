const GameUtil = require("../util/GameUtil");

const socketEngine = require('socket.io');

module.exports = (server) => {

    const rooms = [];

    const players = [];

    const io = socketEngine(server, {
        cors: {
            origin: 'http://localhost',
        }
    });

    console.log('Uniquement au lancement du SERV');
     console.log('les sockets Co', io.sockets.sockets);

 io.on('connection', (socket) => {

     console.log('user has connected');

     socket.on('join', ({roomId, username, isHost}) => {
        console.log('roomId', roomId);
        console.log('pseudo', username);
        console.log('isHost ?', isHost);
        const player = handleNewPlayer(username, socket.id);
        console.log('player novuvellement creer', player);

       // let room = findRoom()

        console.log('tous les joueurs', players);

        // Verifier si roomExiste // Si elle existe pas, on la créer dans isHost // Si il est pas host ca degage
        const {room, joined} = handleRoomJoining(roomId, isHost, player);

        if (!joined) {

            socket.emit('connection-failure')

        } else {
            socket.join(room.id);
            socket.emit('connection-success', {room, player});

            // a remplacer par broadcast pour eviter d'envoyer 2 fois les infos à la room
            io.to(room.id).emit('room-updated', room);

            if (!isHost) io.to(room.host.socketId).emit('game-config-asked', socket.id);
        }

     });

     socket.on('game-config-sent', ({gameConfiguration, socketId}) => {
         io.to(socketId).emit('game-config-host', gameConfiguration);
     });


     socket.on('quiz-generation-asked', async ({gameConfiguration, roomId}) => {
         // const player = findPlayer(socket.id);
         // const room = findRoomByPlayer(player[0]);
         const room = findRoom(roomId)[0];
         console.log("le quiz pour la room suivante", room);
         console.log("avec la conf suivante", gameConfiguration);
         const quizQuery = GameUtil.generateQuizQuery(gameConfiguration);
         const quiz = await GameUtil.executeQuizQuery(quizQuery);
        console.log('temon quiz');
         // Creation quiz
         room.game.quiz = quiz;

         io.to(room.id).emit('quiz-sent', quiz);
     })

     socket.on('quiz-received', (roomId) => {
         const room = findRoom(roomId)[0];
         room.state = 'question' // inGame
         socket.emit('ask-question');
     });

     socket.on('next-question', (roomId) => {
         const room = findRoom(roomId)[0];
         room.state = 'question';
         socket.emit('ask-question')
     })

     socket.on('player-result', ({result, roomId}) => {
         console.log("player-result event catch");
         const {receivedAllAnswers, room} = handlePlayerResult(socket.id, result);

         room.state = 'answer';

         if (receivedAllAnswers) {
             if (room.game.quiz.length > 0) {
                io.to(room.id).emit('display-scores', room)
             } else {
                io.to(room.id).emit('end-game', room)
             }

         }
     })

     socket.on('disconnect', () => {
         console.log('deconnexion');

         const {hasRoomToBeUpdated, room} = handlePlayerDisconnect(socket.id);

         if (hasRoomToBeUpdated) io.to(room.id).emit('room-updated', room);

     })



 })

     const handleNewPlayer = (username, socketId) => {
        let player = findPlayer(socketId);

         if (player.length === 0) player = createPlayer(username, socketId)

         else player = player[0];

         console.log("le nouveau joueur", player);
         return player;
     };

    const findPlayer = (socketId) => {
        return players.filter(player => player.socketId === socketId)
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

    const findRoomByPlayer = (player) => {
        let room = {};

        rooms.forEach((activeRoom) => {
            activeRoom.players.forEach((playerInRoom) => {
                if (playerInRoom.socketId === player.socketId) room = activeRoom;
            })
        });

        return room;
    };

    const createRoom = (roomId, host) => {
       const room = {
           id: roomId,
           host,
           state: 'lobby',
           players: [host],
           game: {
               quiz: {},
               scores: [
                       {
                           player: host,
                           value: 0,
                           rank: 0,
                           lastAnswer: null,
                       }
               ],
               hasAnswered: []
           }
       };

       rooms.push(room);

       return room;
    };

    const playerJoinRoom = (player, room) => {
        //TODO SI LA GAME EN COURS
        if (room.players.length > 8) {
            return false
        }

        room.players.push(player);

        room.game.scores.push({
            player: player,
            value: 0,
            rank: 0,
            lastAnswer: null,
        });


        return true;
    };


    const handlePlayerDisconnect = (socketId) => {

        console.log('la socketId du gars a deco', socketId);
        const player = findPlayer(socketId)[0];
        console.log("le player a deco", player);

        if (!player) return {hasRoomToBeUpdated: false, room: null};

        let room = findRoomByPlayer(player);
        console.log("la room du mec", room);

        if (!room) return {hasRoomToBeUpdated: false, room: null};

        let hasRoomToBeUpdated = true;
        playerLeaveRoom(player, room);

        const isRoomDeletable = checkIfRoomIsDeletable(room);

        if (isRoomDeletable)  {
            deleteRoom(room);
            hasRoomToBeUpdated = false;
        }

        const hostHasToBeTransferred = checkIfHostHasToBeTransferred(player, room);
        if (hostHasToBeTransferred) room = changeRoomHost(room);


        deletePlayer(player);
        return {hasRoomToBeUpdated, room};
    };


    const playerLeaveRoom = (player, room) => {
       let index = -1;

       //TODO Virer son tableau de scores
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
        return room;
    };

    const deletePlayer = (player) => {
        let index = -1;
        players.forEach((activePlayer, i) => {
            if (activePlayer.socketId === player.socketId) index = i;
        });

        players.splice(index, 1);
    }

    const handlePlayerResult = (socketId, result) => {
        const player = findPlayer(socketId)[0];

        if (player) {

            console.log("player handleplayeresult",player);

            const room = findRoomByPlayer(player);
            console.log('roomScores',room.game.scores);
            let receivedAllAnswers = true;

            room.game.scores.forEach((scoreLine) => {
                if (scoreLine.player.socketId === player.socketId) {
                    scoreLine.value += Number(result);
                    scoreLine.lastAnswer = result;
                }
            });

            room.game.scores = sortScoresRank(room.game.scores);
            // room.game.scores[player.socketId]['lastAnswer'] = result;
            // room.game.scores[player.socketId]['value'] += Number(result);


            //TODO trier le tableau en fonction des scores et générer un classement

            room.game.hasAnswered.push(player.socketId);

            room.players.forEach((player) => {
                if(!room.game.hasAnswered.includes(player.socketId)) receivedAllAnswers = false
            });

            console.log("tableau des scores", room.game.scores);

            if (receivedAllAnswers) {
                room.game.quiz.shift();
                room.game.hasAnswered = [];
            }

            return {receivedAllAnswers, room};

        } else {
            return {receivedAllAnswers: false, room: null};
        }
    }

    const sortScoresRank = (scores) => {
        // Trier selon value et générer le rank
        scores.sort((a, b) => {
            return b.value - a.value
        });

        scores[0].rank = 1;

        for (let i = 1; i < scores.length; i++) {
           // if (i===0) scores[i].rank = i+1
            scores[i].rank = i+1;

            if (scores[i-1].value === scores[i].value) scores[i].rank = i;

        }

        return scores;
    }

     //TODO Handle socket.on('error')


};