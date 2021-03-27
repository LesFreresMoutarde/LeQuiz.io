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

            // SI c'est l'host envoyer un event pour repasser la room coté server en state lobby

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
            roomComponent.props.history.replace('/');
            this.destructor()
        });

        this.socket.on('room-updated', (roomData) => {

            roomComponent.setState({roomData})
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
        });

        this.socket.on('start-time', ({time, event, room}) => {

            if (event === "ask-question")
                roomComponent.askQuestion();
            else
                roomComponent.displayScores(room)

            roomComponent.handleTimeLeft(time);

        });

        this.socket.on('no-answer', () => {
            roomComponent.submitAnswer();
        })

        this.socket.on('end-time', ({event, room}) => {
            if (event === 'display-scores') {
                this.socket.emit('next-question', roomComponent.roomId)
            }
            else {
                this.socket.emit('game-reinit', roomComponent.roomId);
                roomComponent.endGame(room)
            }
        })

        this.socket.on('forced-disconnect', () => {
            toastr.error('Vous avez été déconnecté');
            roomComponent.props.history.replace('/');
            this.destructor()
        })

        this.socket.on('error', () => {
            toastr.error('Vous avez été déconnecté');
            roomComponent.props.history.replace('/');
            this.destructor()
        })

        this.socket.on('player-disconnected', ({host, players, scores}) => {
            roomComponent.handlePlayerDisconnect(host, players, scores)
        })

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
