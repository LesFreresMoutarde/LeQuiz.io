const GameUtil = require("../util/GameUtil");
const RoomManager = require("./RoomManager");
const socketEngine = require('socket.io');
const env = require('../config/env');

module.exports = (server) => {

    const io = socketEngine(server, {
        cors: {
            origin: env.frontUrl,
        }
    });

    io.on('connection', (socket) => {

        socket.on('join', ({roomId, username, isHost}) => {
            console.log('roomId', roomId);
            console.log('pseudo', username);
            console.log('isHost ?', isHost);
            const player = RoomManager.handleNewPlayer(username, socket.id);

            const {room, joined} = RoomManager.handleRoomJoining(roomId, isHost, player);

            if (!joined) {

                socket.emit('connection-failure')

            } else {
                socket.join(room.id);
                socket.emit('connection-success', {room, player});

                // a remplacer par broadcast pour eviter d'envoyer 2 fois les infos à la room ?
                io.to(room.id).emit('room-updated', room);

                if (!isHost) io.to(room.host.socketId).emit('game-config-asked', socket.id);
            }

        });

        socket.on('game-config-sent', ({gameConfiguration, socketId}) => {
            io.to(socketId).emit('game-config-host', gameConfiguration);
        });


        socket.on('game-config-update', ({gameConfiguration, roomId}) => {
            //TODO V2 broadcast
            io.to(roomId).emit('game-config-updated-sent', gameConfiguration);
        })


        socket.on('quiz-generation-asked', async ({gameConfiguration, roomId}) => {

            const room = RoomManager.findRoom(roomId)[0];

            if (room) {

                const quizQuery = GameUtil.generateQuizQuery(gameConfiguration);
                const quiz = await GameUtil.executeQuizQuery(quizQuery);

                room.game.quiz = quiz;
                room.game.quizLength = quiz.length;
                io.to(room.id).emit('quiz-sent', quiz);
            }

        });

        //TODO Verifier que tous les joueurs aient reçus
        socket.on('quiz-received', (roomId) => {
            const room = RoomManager.findRoom(roomId)[0];

            if (room) {
                room.state = 'question';

                if (socket.id === room.host.socketId) emitEventAndTimeSignal(room, 'ask-question');
            }

        });

        socket.on('next-question', (roomId) => {
            const room = RoomManager.findRoom(roomId)[0];

            if (room) {
                room.state = 'question';

                if (socket.id === room.host.socketId) emitEventAndTimeSignal(room, 'ask-question');
            }

        });

        socket.on('player-result', ({result}) => {
            console.log("player-result event catch");
            const {receivedAllAnswers, room} = RoomManager.handlePlayerResult(socket.id, result);

            if (room) {
                room.state = 'answer';

                if (receivedAllAnswers) {
                    const eventToEmit = getEventToEmit(room);

                    emitEventAndTimeSignal(room, eventToEmit);
                }
            }
        });

        socket.on('game-reinit', (roomId) => {
            const room = RoomManager.findRoom(roomId)[0];

            if (room) RoomManager.reinitRoomGame(room)
        })

        socket.on('disconnect', () => {

            const {hasRoomToBeUpdated, hasScoresToBeDisplayed, room} = RoomManager.handlePlayerDisconnect(socket.id);

            if (hasRoomToBeUpdated)
                io.to(room.id).emit('player-disconnect', {
                    host:room.host,
                    players:room.players,
                    scores: room.game.scores
                });

            if (hasScoresToBeDisplayed) {
                const eventToEmit = getEventToEmit(room);

                emitEventAndTimeSignal(room, eventToEmit);
            }

        })

    });

    const emitEventAndTimeSignal = (room, event) => {

        clearTimeout(room.game.timer);

        let time = GameUtil.ROUND_TIME;

        if (event !== "ask-question") time = GameUtil.SCORES_TIME

        io.to(room.id).emit('start-time', {time, event, room});

        room.game.timer = setTimeout(() => {

            const noAnswerPlayers = RoomManager.getNoAnswerPlayers(room);

            if (event === "ask-question") {
                noAnswerPlayers.forEach((socketId) => {
                    io.to(socketId).emit('no-answer')
                })
            } else {
                io.to(room.id).emit("end-time", {event, room});
            }

        }, time)
    };

    const getEventToEmit = (room) => {

        if (room.game.quiz.length > 0) {
            return 'display-scores';
        }

        return 'end-game'
    };

    //TODO Handle socket.on('error')
};
