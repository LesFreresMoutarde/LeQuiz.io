import React from "react";
import ClientSocket from "../../../manager/ClientSocket";
import Title from "../../misc/Title";
import Loader from "../../misc/Loader";
import Lobby from "./views/Lobby";
import Util from "../../../util/Util";
import GameUtil from "../../../util/GameUtil";

class Room extends React.Component {

    socket;

    constructor(props) {
        super(props);
        // this.props.history.length = 0;
        console.log(this.props.history);
        this.state = {
            isLoading: true,
            roomId: false,
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
        (async () => {

            try {
                console.log('props match', this.props.match);
                const roomId  = this.props.match.params.id;
                let isHost = false;

                if (Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key)) {
                    const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                    console.log('gameconfigFromRoom', gameConfiguration);

                    isHost = gameConfiguration.isHost;

                    delete gameConfiguration.isHost;

                }
                console.log("isHost ?", isHost);
                const pseudo = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                //TODO Conditionner si le room id existe dans le tableau des ID

                // Appel endpoint avec roomID
                const response = await Util.performAPIRequest(`game/verify/rooms/${roomId}`);

                if (!response.ok) throw new Error('Cannot join this room');

                const {isRoomValid} = await response.json();

                console.log("IS ROOM VALID !", isRoomValid);

                if (!isRoomValid) throw new Error('This room doesn\'t exist' );


                this.socket.connectToRoom(roomId, pseudo, isHost);
                this.socket.handleSocketCommunication(this);
            } catch (error) {
                this.props.history.replace('/');
                console.error(error);
            }
        })()

    }

    componentWillUnmount() {
        //SocketManager.disconnectFromSocketServer();
        //TODO Sauf s'il veut juste editer un menu donc pas possible de faire ca la
        this.socket.destructor()
        console.log("FAIL ON A UNMOUNT")

        //this.props.history.replace('/')
        //window.history.replaceState('/', '/', '/')
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