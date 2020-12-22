import * as socketIoClient from 'socket.io-client';
import Util from "../util/Util";
import GameUtil from "../util/GameUtil";

class ClientSocket {

    socket;

    constructor() {
        this.socket = socketIoClient(`${window.location.origin}:3000`);
    }

    connectToRoom = (roomId, username, isHost) => {
        console.log('le payload', Util.accessTokenPayload);
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
                },
                currentPlayer: player,
                roomData: room
            })

        });

        this.socket.on('connection-failure', () => {
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
            roomComponent.handleTimeLeft('question');
            roomComponent.timeoutId = window.setTimeout(() => {
                roomComponent.submitAnswer()
            }, GameUtil.ROUND_TIME)

        });

        this.socket.on('display-scores', (roomData) => {
            clearInterval(roomComponent.intervalId);
            roomComponent.setState(
                {
                    display: {
                        lobby: false,
                        question: false,
                        answer: true,
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


    destructor = () => {
        this.socket.disconnect();
    }
}

export default ClientSocket;
