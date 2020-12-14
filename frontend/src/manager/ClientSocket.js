import * as socketIoClient from 'socket.io-client';

class ClientSocket {

    socket;

    constructor() {
        this.socket = socketIoClient(`${window.location.origin}:3000`);
    }

    connectToRoom = (roomId) => {
        this.socket.emit('join', roomId);
    };

    handleSocketCommunication = (roomComponent) => {

        this.socket.on('connection-success', () => {
            roomComponent.setState({
                isLoading: false,
                display: {
                    room: true,
                    question: false,
                    answer: false,
                    endGame: false,
                },
            })
        })




        //TODO Handle socket.on('error')
    };


    destructor = () => {
        this.socket.disconnect();
    }
}

export default ClientSocket;