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
            isHost: false,
            socketOpen: false,
            display: {
                lobby: false,
                question: false,
                answer: false,
                endGame: false
            },
            roomData: false,
            gameConfiguration: false,
            currentPlayer: false,
        }



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

                    if (gameConfiguration.roomCode === roomId) {
                        isHost = true;
                        delete gameConfiguration.roomCode;
                        this.setState({isHost, gameConfiguration});
                        console.log('gameConfig sans roomCode normalement', gameConfiguration);
                        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);
                        console.log('la gameConfig sans RoomCode depuis le localStorage', Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key))
                    } else {
                        Util.clearSessionStorage();
                    }

                }
                console.log("isHost ?", isHost);

                const pseudo = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                const response = await Util.performAPIRequest(`game/verify/rooms/${roomId}`);

                if (!response.ok) throw new Error('Cannot join this room');

                const {isRoomValid} = await response.json();

                console.log("IS ROOM VALID !", isRoomValid);

                if (!isRoomValid) throw new Error('This room doesn\'t exist' )

                this.socket = new ClientSocket();
                this.socket.connectToRoom(roomId, pseudo, isHost);
                this.socket.handleSocketCommunication(this);
                this.setState({socketOpen: true});
            } catch (error) {
                this.props.history.replace('/');
                console.error(error);
            }
        })()

    }


    startQuiz = () => {
        //TODO verifier que le Host a les droits pour le mode de jeu !!
        console.log("on start le quizZZZ");
        this.socket.generateQuiz()

    };

    leaveRoom = () => {
        console.log("leave room by button")
    };



    componentWillUnmount() {

        Util.clearSessionStorage();
        if(this.state.socketOpen) this.socket.destructor()
        console.log("FAIL ON A UNMOUNT")

        //this.props.history.replace('/')
        //window.history.replaceState('/', '/', '/')
    }

    render() {
        const { isLoading, display, roomData, gameConfiguration, currentPlayer, isHost } = this.state;
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
                    <Lobby isHost={isHost}
                           currentPlayer={currentPlayer}
                           roomData={roomData}
                           gameConfiguration={gameConfiguration}
                           startQuiz={this.startQuiz}
                           leaveRoom={this.leaveRoom}
                    />
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