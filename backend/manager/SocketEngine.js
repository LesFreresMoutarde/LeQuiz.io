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
            try {

                const player = RoomManager.handleNewPlayer(username, socket.id, roomId);

                const room = RoomManager.handleRoomJoining(roomId, isHost, player);

                socket.join(room.id);

                switch (room.state) {

                    case RoomManager.LOBBY_ROOM_STATE:
                        socket.emit('enter-lobby', {room, player})
                        if (!isHost) {
                            socket.to(room.id).emit('receive-new-player', {players: room.players, scores: room.game.scores});
                            io.to(room.host.socketId).emit('require-game-config-from-host', socket.id);
                        }

                        break;
                    case RoomManager.QUESTION_ROOM_STATE:
                    case RoomManager.ANSWER_ROOM_STATE:

                        // socket.to(room.id).emit('room-updated', room);
                        // io.to(room.host.socketId).emit('ask-game-config', socket.id)
                        // Envoyer Room Updated AUX AUTRES JOUEURS
                        // Demander config, quiz et chrono à l'host

                }


            } catch (error) {
                socket.emit('connection-failure')
            }
        });

        socket.on('send-game-config-to-server', ({gameConfiguration, socketId}) => {
            io.to(socketId).emit('receive-game-config', gameConfiguration);
        });


        socket.on('update-game-config', ({gameConfiguration, roomId}) => {
            socket.to(roomId).emit('receive-new-game-config', gameConfiguration);
        })


        socket.on('generate-quiz', async ({gameConfiguration, roomId}) => {

            try {
                const room = RoomManager.findRoom(roomId);

                const quizQuery = GameUtil.generateQuizQuery(gameConfiguration);
                const quiz = await GameUtil.executeQuizQuery(quizQuery);

                room.game.quiz = quiz;
                room.game.quizLength = quiz.length;
                io.to(room.id).emit('receive-quiz', quiz);

            } catch (error) {
                socket.emit('force-disconnection');
            }
        });

        //TODO Verifier que tous les joueurs aient reçus ou conditionner l'execution qu'a un seul joueur
        socket.on('receive-quiz-confirmation', (roomId) => {
            try {
                const room = RoomManager.findRoom(roomId);

                room.state = RoomManager.QUESTION_ROOM_STATE;

                if (socket.id === room.host.socketId)
                    emitEventAndTimeSignal(room, 'ask-question');
            } catch (error) {
                socket.emit('force-disconnection');
            }
        });

        socket.on('next-question', (roomId) => {
            try {
                const room = RoomManager.findRoom(roomId);

                room.state = RoomManager.QUESTION_ROOM_STATE;

                if (socket.id === room.host.socketId)
                    emitEventAndTimeSignal(room, 'ask-question');
            } catch (error) {
                socket.emit('force-disconnection');
            }
        });

        socket.on('send-player-result', ({result}) => {
            console.log("send-player-result event catch");

            try {
                const {receivedAllAnswers, room} = RoomManager.handlePlayerResult(socket.id, result);

                if (receivedAllAnswers) {
                    room.state = RoomManager.ANSWER_ROOM_STATE;

                    const eventToEmit = getEventToEmit(room);

                    emitEventAndTimeSignal(room, eventToEmit);
                }
            } catch (error) {
                socket.emit('force-disconnection');
            }
        });

        socket.on('reset-game', (roomId) => {
            try {
                const room = RoomManager.findRoom(roomId);
                RoomManager.resetRoomGame(room)
            } catch (error) {
                socket.emit('force-disconnection');
            }
        })

        socket.on('disconnect', () => {
            console.log("disconnect")
            try {
                const {
                    hasRoomToBeUpdated,
                    hasScoresToBeDisplayed,
                    room
                } = RoomManager.handlePlayerDisconnect(socket.id);

                if (hasRoomToBeUpdated)
                    io.to(room.id).emit('player-disconnected', {
                        host:room.host,
                        players:room.players,
                        scores: room.game.scores
                    });

                if (hasScoresToBeDisplayed) {
                    const eventToEmit = getEventToEmit(room);

                    emitEventAndTimeSignal(room, eventToEmit);
                }

            } catch (error) {
                socket.emit('force-disconnection');
            }

        })
    });

    const emitEventAndTimeSignal = (room, event) => {

        clearTimeout(room.game.timer);

        let time = GameUtil.ROUND_TIME;

        if (event !== "ask-question") time = GameUtil.SCORES_TIME

        io.to(room.id).emit('start-time', {time, event, room});

        room.game.timer = setTimeout(() => {

            if (event === "ask-question") {
                const noAnswerPlayers = RoomManager.getNoAnswerPlayers(room);

                noAnswerPlayers.forEach((socketId) => {
                    io.to(socketId).emit('force-answer')
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
