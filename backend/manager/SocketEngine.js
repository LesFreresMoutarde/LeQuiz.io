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

            try {

                const player = RoomManager.handleNewPlayer(username, socket.id, roomId);

                const room = RoomManager.handleRoomJoining(roomId, isHost, player);

                const clientRoom = RoomManager.formatRoomForEmit(room);

                socket.join(room.id);

                if (room.state === RoomManager.LOBBY_ROOM_STATE) {
                    socket.emit('enter-lobby', {room: clientRoom, player})

                    if (!isHost) {
                        socket.to(room.id).emit('receive-new-player', clientRoom);

                        io.to(room.host.socketId).emit('require-game-config-from-host', socket.id);
                    }

                } else {
                    socket.emit('enter-in-game', {room: clientRoom, player});

                    socket.to(room.id).emit('receive-new-player', clientRoom);

                    io.to(room.host.socketId).emit('require-game-info-from-host', socket.id);
                }

            } catch (error) {
                socket.emit('connection-failure')
            }
        });

        socket.on('send-game-config-to-server', ({gameConfiguration, socketId}) => {
            io.to(socketId).emit('receive-game-config', gameConfiguration);
        });

        socket.on('send-game-info-to-server', ({gameConfiguration, quiz, socketId, roomId, currentQuestion}) => {
            try {
                const room = RoomManager.findRoom(roomId);

                const timeLeft = RoomManager.getTimeLeft(room);

                const params = {gameConfiguration, quiz, time: timeLeft*1000, state: room.state, currentQuestion}

                io.to(socketId).emit('receive-game-info', params);
            } catch (error) {
                socket.emit('force-disconnection');
            }

        })


        socket.on('update-game-config', ({gameConfiguration, roomId}) => {
            socket.to(roomId).emit('receive-new-game-config', gameConfiguration);
        })


        socket.on('generate-quiz', async ({gameConfiguration, roomId}) => {
            try {
                const room = RoomManager.findRoom(roomId);

                const quiz = await GameUtil.generateQuiz(gameConfiguration);

                room.game.quiz = quiz;
                room.game.quizLength = quiz.length;

                io.to(room.id).emit('receive-quiz', {quiz, room: RoomManager.formatRoomForEmit(room)});
            } catch (error) {
                socket.emit('force-disconnection');
            }
        });

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

        socket.on('send-player-result', ({roundPoints}) => {

            try {
                const {receivedAllAnswers, room} = RoomManager.handlePlayerResult(socket.id, roundPoints);

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

                if (hasRoomToBeUpdated) {
                    const clientRoom = RoomManager.formatRoomForEmit(room);

                    io.to(room.id).emit('player-disconnected', clientRoom);
                }

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

        let time;

        switch (event) {
            case 'ask-question':
                time = GameUtil.ROUND_TIME;
                break;
            case 'display-scores':
                time = GameUtil.SCORES_TIME;
                break;
            case 'end-game':
                time = GameUtil.END_GAME_TIME
        }

        const clientRoom = RoomManager.formatRoomForEmit(room);

        io.to(room.id).emit('start-time', {time, event, room: clientRoom});

        room.game.timer = setTimeout(() => {

            if (event === "ask-question") {
                const noAnswerPlayers = RoomManager.getNoAnswerPlayers(room);

                io.to(noAnswerPlayers).emit('force-answer')

            } else {
                io.to(room.id).emit("end-time", {event, room: clientRoom});
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
