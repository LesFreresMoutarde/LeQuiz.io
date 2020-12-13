import * as socketIo from 'socket.io-client';

class SocketManager {

    static connectToSocketServer = () => {
        const socket = socketIo(`${window.location.origin}:3000`);
        console.log("la socket", socket)
        console.log(window.location);
    }
}

export default SocketManager;