import * as socketIoClient from 'socket.io-client';
import Util from "../util/Util";

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

        this.socket.on('connection-success', () => {
            roomComponent.setState({
                isLoading: false,
                display: {
                    lobby: true,
                    question: false,
                    answer: false,
                    endGame: false,
                },
            })
        });

        this.socket.on('connection-failure', () => {
            roomComponent.props.history.replace('/');
            this.destructor()
        })

        this.socket.on('room-updated', (roomData) => {
            console.log('les infos de la rooms actualisées', roomData);
        })






        //TODO Handle socket.on('error')
    };


    destructor = () => {
        this.socket.disconnect();
    }
}

export default ClientSocket;