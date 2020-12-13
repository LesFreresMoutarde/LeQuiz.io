import React from "react";
// import * as socketIo from 'socket.io-client';
import SocketManager from "../../../manager/SocketManager";

class Room extends React.Component {

    //TODO This page is accesible only if backend has generated code game matching the id param
    static allowed = [10,15,20];

    constructor(props) {
        super(props);
        console.log("propos", this.props);
        this.state = {
            isLoading: true,
            roomId: false
        }
    }

    componentDidMount() {
        const id  = Number(this.props.match.params.id);

        if (!Room.allowed.includes(id)) this.props.history.replace('/404/')

        else {
            // const socket = socketIo('http://localhost:3000')
            // console.log("la socket", socket)
            SocketManager.connectToSocketServer();
        }



        console.log("l'ID :",id)
    }

    render() {
        return (
            <p>Totot !!!</p>
        )
    }


}

export default Room;