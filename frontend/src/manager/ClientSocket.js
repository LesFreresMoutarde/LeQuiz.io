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
            console.log('RoomData depuis connectionsuccess', room);
            console.log('Player depuis connectionsuccess', player);
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
            console.log('UN JOUEUR ME DEMANDE LA CONF DE LA GAME');
            const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
            this.socket.emit('game-config-sent', {gameConfiguration,socketId});
        })

        this.socket.on('game-config-host', (gameConfiguration) => {
            console.log('la conf de la game recu', gameConfiguration);
            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);
            roomComponent.setState({
                gameConfiguration,
                isLoading: false
            });
        })






        //TODO Handle socket.on('error')
    };


    destructor = () => {
        this.socket.disconnect();
    }
}

export default ClientSocket;