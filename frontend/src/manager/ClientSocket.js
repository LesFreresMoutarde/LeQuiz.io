import * as socketIoClient from 'socket.io-client';
import Util from "../util/Util";
import GameUtil from "../util/GameUtil";

class ClientSocket {

    socket;
    //questionTimeout;

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
                    endGame: false,
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
            console.log('les infos de la rooms actualisées', roomData);
            let isHost = roomComponent.state.isHost;

            if (!isHost) {
                console.log('this.socket', this.socket);
                if (this.socket.id === roomData.host.socketId) isHost = true;
            }

            roomComponent.setState({roomData, isHost})
        });

        this.socket.on('game-config-asked', (socketId) => {

            const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
            this.socket.emit('game-config-sent', {gameConfiguration,socketId});
        })

        this.socket.on('game-config-host', (gameConfiguration) => {

            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);
            roomComponent.setState({
                gameConfiguration,
                isLoading: false
            });
        })

        this.socket.on('quiz-sent', (quiz) => {
            console.log("le quiz", quiz);
            Util.addObjectToSessionStorage(GameUtil.QUIZ_SESSION_STORAGE_KEY, quiz);
            this.socket.emit('quiz-received', roomComponent.roomId)
        })

        this.socket.on('ask-question', () => {
            roomComponent.askQuestion();
            GameUtil.QUESTION_TIMEOUT_ID = setTimeout(() => {
                roomComponent.submitAnswer()
            }, 10000)
        })

        this.socket.on('display-scores', (roomData) => {
            roomComponent.setState(
                {
                    display: {
                        lobby: false,
                        question: false,
                        answer: true,
                        endGame: false,
                    },
                    roomData
                }
            )

            // SetTimeout (this.socket.emit('nextquestion)
        })

        //this.socket.on('send-answer')




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