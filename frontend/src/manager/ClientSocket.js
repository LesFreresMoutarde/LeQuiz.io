import * as socketIoClient from 'socket.io-client';
import Util from "../util/Util";
import GameUtil from "../util/GameUtil";
import env from "../config/env";
import Toastr from "toastr2";
const toastr = new Toastr();

class ClientSocket {

    socket;

    constructor() {
        this.socket = socketIoClient(env.socketEngineUrl);
    }

    connectToRoom = (roomId, username, isHost) => {
        this.socket.emit('join', {roomId, username, isHost});
    };

    handleSocketCommunication = (roomComponent) => {

        this.socket.on('connection-success', ({room, player}) => {

            let isLoading = true;

            if (room.host.socketId === this.socket.id) isLoading = false;

            roomComponent.setState({
                isLoading,
                display: {
                    lobby: true,
                    question: false,
                    answer: false,
                    gameOptions: false,
                },
                currentPlayer: player,
                roomData: room
            })

        });

        this.socket.on('connection-failure', () => {
            toastr.error('Impossible de rejoindre cette room');
            Util.clearSessionStorage();
            roomComponent.props.history.replace('/');
            this.destructor()
        });

        this.socket.on('room-updated', (roomData) => {
            let isHost = roomComponent.state.isHost;

            if (!isHost) {
                if (this.socket.id === roomData.host.socketId) isHost = true;
            }

            roomComponent.setState({roomData, isHost})
        });

        this.socket.on('game-config-asked', (socketId) => {

            const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);

            this.socket.emit('game-config-sent', {gameConfiguration,socketId});
        })

        this.socket.on('game-config-updated-sent', (gameConfiguration) => {

            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

            roomComponent.setState({gameConfiguration});
        });

        this.socket.on('game-config-host', (gameConfiguration) => {

            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

            roomComponent.setState({
                gameConfiguration,
                isLoading: false
            });
        });

        this.socket.on('quiz-sent', (quiz) => {
            Util.addObjectToSessionStorage(GameUtil.QUIZ_SESSION_STORAGE_KEY, quiz);

            this.socket.emit('quiz-received', roomComponent.roomId)
        });

        this.socket.on('ask-question', () => {
            roomComponent.askQuestion();

            // A déporter côté server
            // roomComponent.handleTimeLeft('question');
            //
            // roomComponent.timeoutId = window.setTimeout(() => {
            //     roomComponent.submitAnswer()
            // }, GameUtil.ROUND_TIME)
        });

        this.socket.on('timer', time => {
            console.log("le timer", time)

            roomComponent.setState({
                timeLeft: time,
            })
        })

        this.socket.on('timeout', time => {
            console.log("le timerOUT", time)

            //envoié la réponse ave
            roomComponent.submitAnswer()

            // A voir
            roomComponent.setState({
                timeLeft: 0,
            })
        })

        this.socket.on('display-scores', (roomData) => {
            clearInterval(roomComponent.intervalId);

            roomComponent.setState(
                {
                    display: {
                        lobby: false,
                        question: false,
                        answer: true,
                        gameOptions: false,
                    },
                    roomData,
                    questionInputDisabled: false,
                }
            );

            roomComponent.handleTimeLeft('scores');

            setTimeout(() => {
                clearInterval(roomComponent.intervalId);
                this.socket.emit('next-question', roomComponent.roomId);
            }, GameUtil.SCORES_TIME);
        });

        this.socket.on('end-game', (roomData) => {
            clearInterval(roomComponent.intervalId);

            roomComponent.setState({
                display: {
                    lobby: false,
                    question: false,
                    answer: true,
                    gameOptions: false,
                },
                roomData,
                questionInputDisabled: false
            });

            roomComponent.handleTimeLeft('scores');

            setTimeout(() => {
                this.socket.emit('game-reinit', roomComponent.roomId);
                clearInterval(roomComponent.intervalId);
                roomComponent.setState({
                    display: {
                        lobby: true,
                        question: false,
                        answer: false,
                        gameOptions: false,
                    }
                })
            }, GameUtil.SCORES_TIME);
        })


        //TODO Handle socket.on('error')
    };


    generateQuiz = (roomId) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        this.socket.emit('quiz-generation-asked', {gameConfiguration, roomId})
    };

    sendResult = ({result, roomId}) => {
        this.socket.emit('player-result', {result, roomId});
    };

    updateGameConfiguration = (roomId) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        this.socket.emit('game-config-update', {gameConfiguration, roomId})
    }


    destructor = () => {
        this.socket.disconnect();
    }
}

export default ClientSocket;
