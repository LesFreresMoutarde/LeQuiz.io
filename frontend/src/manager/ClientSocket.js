import * as socketIoClient from 'socket.io-client';
import Util from "../util/Util";
import GameUtil from "../util/GameUtil";
import env from "../config/env";
import {app} from "../components/App";

class ClientSocket {

    socket;

    constructor() {
        this.socket = socketIoClient(env.socketEngineUrl);
    }

    connectToRoom = (roomId, username, isHost) => {
        this.socket.emit('join', {roomId, username, isHost});
    };

    handleSocketCommunication = (roomComponent) => {

        this.socket.on('connection-failure', () => {

            app.toastr.error('Impossible de rejoindre cette room');

            roomComponent.props.history.replace('/');

            this.destructor();
        });

        this.socket.on('enter-lobby', ({room, player}) => {

            let isLoading = true;

            if (room.host.socketId === this.socket.id) isLoading = false;

            roomComponent.setState({
                isLoading,
                display: {
                    lobby: !isLoading,
                    question: false,
                    answer: false,
                    gameOptions: false,
                },
                currentPlayer: player,
                roomData: room
            })

        });

        this.socket.on('enter-in-game', ({room, player}) => {
            roomComponent.setState({
                currentPlayer: player,
                roomData: room,
            })
        })

        this.socket.on('receive-new-player', (roomData) => {

            roomComponent.setState({
                roomData
            })
        })

        this.socket.on('require-game-config-from-host', (socketId) => {

            const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);

            this.socket.emit('send-game-config-to-server', {gameConfiguration,socketId});
        })

        this.socket.on('receive-game-config', (gameConfiguration) => {

            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

            roomComponent.setState({
                gameConfiguration,
                display: {
                    lobby: true,
                    question: false,
                    answer: false,
                    gameOptions: false,
                },
                isLoading: false
            });
        });

        this.socket.on('receive-new-game-config', (gameConfiguration) => {

            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

            roomComponent.setState({gameConfiguration});
        });

        this.socket.on('receive-quiz', ({quiz, room}) => {
            Util.addObjectToSessionStorage(GameUtil.QUIZ_SESSION_STORAGE_KEY, quiz);

            roomComponent.setState({roomData: room});

            this.socket.emit('receive-quiz-confirmation', roomComponent.roomId)
        });

        this.socket.on('require-game-info-from-host', (socketId) => {
            const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);

            const quiz = Util.getObjectFromSessionStorage(GameUtil.QUIZ_SESSION_STORAGE_KEY);

            this.socket.emit('send-game-info-to-server', {
                gameConfiguration,
                quiz,
                socketId,
                roomId:roomComponent.roomId,
                currentQuestion: roomComponent.state.currentQuestion
            });

        });

        this.socket.on('receive-game-info', ({gameConfiguration, quiz, time, state, currentQuestion}) => {

            const display = { lobby: false, question: false, answer: false, gameOptions: false}

            display[state] = true;

            roomComponent.handleTimeLeft(time);

            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);
            Util.addObjectToSessionStorage(GameUtil.QUIZ_SESSION_STORAGE_KEY, quiz);

            roomComponent.setState({
                gameConfiguration,
                isLoading: false,
                display,
                currentQuestion
            })

        })

        this.socket.on('start-time', ({time, event, room}) => {

            if (event === "ask-question") {
                roomComponent.askQuestion();
            } else {
                roomComponent.displayScores(room);
            }

            roomComponent.handleTimeLeft(time);
        });

        this.socket.on('force-answer', () => {
            roomComponent.submitAnswer();
        })

        this.socket.on('end-time', ({event, room}) => {
            if (event === 'display-scores') {
                this.socket.emit('next-question', roomComponent.roomId)
            }
            else {
                this.socket.emit('reset-game', roomComponent.roomId);
                roomComponent.endGame(room)
            }
        })

        this.socket.on('force-disconnection', () => {
            app.toastr.error('Vous avez été déconnecté');
            roomComponent.props.history.replace('/');
            this.destructor()
        })

        this.socket.on('error', () => {
            app.toastr.error('Vous avez été déconnecté');
            roomComponent.props.history.replace('/');
            this.destructor()
        })

        this.socket.on('player-disconnected', (roomData) => {
            roomComponent.handlePlayerDisconnect(roomData)
        })

    };

    generateQuiz = (roomId) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        this.socket.emit('generate-quiz', {gameConfiguration, roomId})
    };

    sendResult = ({roundPoints, roomId}) => {
        this.socket.emit('send-player-result', {roundPoints, roomId});
    };

    updateGameConfiguration = (roomId) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        this.socket.emit('update-game-config', {gameConfiguration, roomId})
    }


    destructor = () => {
        this.socket.disconnect();
    }
}

export default ClientSocket;
