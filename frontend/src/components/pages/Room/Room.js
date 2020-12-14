import React from "react";
import ClientSocket from "../../../manager/ClientSocket";
import Title from "../../misc/Title";
import Loader from "../../misc/Loader";
import Lobby from "./views/Lobby";
import Util from "../../../util/Util";
import GameUtil from "../../../util/GameUtil";

class Room extends React.Component {

    //TODO This page is accesible only if backend has generated code game matching the id param
    static allowed = [10,15,20];

    socket;

    static LOBBY_TITLE = "Salon de jeu";


    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            roomId: false,
            isHost: false,
            display: {
                lobby: false,
                question: false,
                answer: false,
                endGame: false
            },
            date: 'tototo'
        }
        this.socket = new ClientSocket();

    }

    componentDidMount() {
        const roomId  = this.props.match.params.id;

        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);

        let isHost = false;

        if (gameConfiguration.roomCode) isHost = true;

        const pseudo = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


        this.socket.connectToRoom(roomId, pseudo, isHost);
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
        const { isLoading, display } = this.state;
        console.log("le state", this.state);

        if (isLoading) {
            return (
                <>
                    <Title title={Room.LOBBY_TITLE}/>
                    <div className="app loading">
                        <div className="app-loader">
                            <Loader width="max(6vw, 80px)"/>
                        </div>
                    </div>
                </>
            );
        } else if (display.lobby) {

            return (
                <>
                    <Title title={Room.LOBBY_TITLE}/>
                    <Lobby/>
                </>
            )

        } else if (display.question) {

            return (
                <p>la question</p>
            )

        } else if (display.answer) {

            return (
                <p>la reponse</p>
            )

        } else if (display.end) {

            return (
                <p>Fin de partie</p>
            )

        }
    }


}

export default Room;