import * as socketIoClient from 'socket.io-client';

class ClientSocket {

    socket;

    constructor() {
        this.socket = socketIoClient(`${window.location.origin}:3000`);
    }

    connectToRoom = (roomId) => {
        this.socket.emit('join', roomId);
    };

    handleSocketCommunication = (instance) => {
        this.socket.on('test', (date) => {
            console.log("msg reçu", date);
            instance.setState({date})
        })
    };


    destructor = () => {
        this.socket.disconnect();
    }
}

export default ClientSocket;