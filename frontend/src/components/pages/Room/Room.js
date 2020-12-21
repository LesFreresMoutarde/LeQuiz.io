import React from "react";
import ClientSocket from "../../../manager/ClientSocket";
import Title from "../../misc/Title";
import Loader from "../../misc/Loader";
import Lobby from "./views/Lobby";
import Util from "../../../util/Util";
import GameUtil from "../../../util/GameUtil";
import Question from "./views/Question";
import Answer from "./views/Answer";

class Room extends React.Component {

    socket;
    roomId;
    timeoutId;
    intervalId;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            roomId: false,
            isHost: false,
            socketOpen: false,
            timeLeft: false,
            display: {
                lobby: false,
                question: false,
                answer: false,
            },
            roomData: false,
            gameConfiguration: false,
            currentPlayer: false,
            currentQuestion: false,
            questionInputDisabled: false
        }



    }

    componentDidMount() {
        (async () => {

            try {
                const roomId  = this.props.match.params.id;
                let isHost = false;

                if (Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key)) {
                    const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);

                    if (gameConfiguration.roomCode === roomId) {
                        isHost = true;
                        delete gameConfiguration.roomCode;
                        this.setState({isHost, gameConfiguration});
                        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);
                    } else {
                        Util.clearSessionStorage();
                    }

                }

                const pseudo = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                const response = await Util.performAPIRequest(`game/verify/rooms/${roomId}`);

                if (!response.ok) throw new Error('Cannot join this room');

                const {isRoomValid} = await response.json();

                if (!isRoomValid) throw new Error('This room doesn\'t exist' )

                this.roomId = roomId;
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
        this.socket.generateQuiz(this.roomId)

    };

    leaveRoom = () => {
        console.log("leave room by button")
    };

    askQuestion = () => {
        const quiz = Util.getObjectFromSessionStorage(GameUtil.QUIZ_SESSION_STORAGE_KEY);

        const currentQuestion = quiz.shift();

        Util.addObjectToSessionStorage(GameUtil.QUIZ_SESSION_STORAGE_KEY, quiz);

        this.setState({
            display: {
                lobby: false,
                question: true,
                answer: false,
            },
            currentQuestion
        });
    };

    submitAnswer = (answer = null) => {

        let isGoodAnswer = false;
        if (answer) {
            this.setState({questionInputDisabled: true});
            window.clearTimeout(this.timeoutId);
            const { currentQuestion } = this.state;
            isGoodAnswer = GameUtil.verifyAnswer(answer, currentQuestion.type);
        }

        this.socket.sendResult({result: isGoodAnswer, roomId: this.roomId})
    };

    handleTimeLeft = (type) => {

        let timeLeft = GameUtil.ROUND_TIME / 1000;

        if (type === 'scores') timeLeft = GameUtil.SCORES_TIME / 1000;

        this.setState({timeLeft});
        timeLeft --;
        this.intervalId = window.setInterval(() => {
            this.setState({timeLeft});
            timeLeft --
        }, 1000) ;
    };


    componentWillUnmount() {

        Util.clearSessionStorage();

        if(this.state.socketOpen) {
            this.socket.destructor();
            clearTimeout(this.timeoutId);
            clearInterval(this.intervalId);
        }

    }

    render() {
        const {
            isLoading, display, roomData, gameConfiguration,
            currentPlayer, isHost, currentQuestion, timeLeft,
            questionInputDisabled
        } = this.state;

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
                <>
                    <Question currentQuestion={currentQuestion}
                              submitAnswer={this.submitAnswer}
                              timeLeft={timeLeft}
                              questionInputDisabled={questionInputDisabled}
                    />
                </>
            )

        } else if (display.answer) {

            return (
                <>
                    <Answer game={roomData.game}
                            currentQuestion={currentQuestion}
                            currentPlayer={currentPlayer}
                            timeLeft={timeLeft}
                    />
                </>
            )

        }
    }


}

export default Room;
