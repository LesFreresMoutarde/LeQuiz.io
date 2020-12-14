import React from "react";
// import * as socketIo from 'socket.io-client';
import ClientSocket from "../../../manager/ClientSocket";

class Room extends React.Component {

    //TODO This page is accesible only if backend has generated code game matching the id param
    static allowed = [10,15,20];
    socket;

    constructor(props) {
        super(props);
        console.log("propos", this.props);
        this.state = {
            isLoading: true,
            roomId: false,
            date: 'tototo'
        }
        this.socket = new ClientSocket();

    }

    componentDidMount() {
        const roomId  = this.props.match.params.id;
        this.socket.connectToRoom(roomId);
        this.socket.handleSocketCommunication(this);

       // if (!Room.allowed.includes(id)) this.props.history.replace('/404/')

        //else {
            // const socket = socketIo('http://localhost:3000')
            // console.log("la socket", socket)
            //SocketManager.connectToSocketServer();

        //}



        console.log("l'ID :",roomId)
    }

    componentWillUnmount() {
        //SocketManager.disconnectFromSocketServer();
        this.socket.destructor()
    }

    render() {
        const {date} = this.state;
        return (
            <p>la date {date}</p>
        )
    }


}

export default Room;