import React from "react";
import ClientSocket from "../../../manager/ClientSocket";
import Title from "../../misc/Title";
import Loader from "../../misc/Loader";
import Lobby from "./views/Lobby";
import Util from "../../../util/Util";
import GameUtil from "../../../util/GameUtil";
import Question from "./views/Question";
import Answer from "./views/Answer";
import CreateGame from "../CreateGame/CreateGame";
import Toastr from "toastr2";
const toastr = new Toastr();

class Room extends React.Component {

    clientSocket;
    roomId;
    timeoutId; //TODO Remove
    intervalId; //TODO Remove
    timer;
    gameOptionsToLoad;

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
                gameOptions: false
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
                let username = '';

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

                const roomIdResponse = await Util.performAPIRequest(`game/rooms/verify/${roomId}`);

                if (!roomIdResponse.ok) throw new Error('Cannot join this room');

                const {isRoomValid} = await roomIdResponse.json();

                if (!isRoomValid) throw new Error('This room doesn\'t exist' );

                this.roomId = roomId;
                this.clientSocket = new ClientSocket();

                const user = Util.getJwtPayloadContent(Util.accessToken).user;

                if (user) {
                    username = user.username
                } else {

                    const guestIdResponse = await Util.performAPIRequest('users/guest-id');

                    if (!guestIdResponse.ok) throw new Error('Cannot join this room');

                    const { guestId } = await guestIdResponse.json();

                    username = `Guest#${guestId}`;

                }
                this.clientSocket.connectToRoom(roomId, username, isHost);
                this.clientSocket.handleSocketCommunication(this);
                this.setState({socketOpen: true});
            } catch (error) {
                toastr.error('Impossible de rejoindre cette room');
                this.props.history.replace('/');
            }
        })()

    }


    startQuiz = () => {
        //TODO V2 verifier que le Host a les droits pour le mode de jeu !!
        this.clientSocket.generateQuiz(this.roomId)

    };

    leaveRoom = () => {
        this.props.history.replace('/');
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
                gameOptions: false,
            },
            currentQuestion
        });
    };

    submitAnswer = (answer = null) => {
        console.log("TRIGGER submitAnswer()");
        let isGoodAnswer = false;
        if (answer) {
            this.setState({questionInputDisabled: true});
            // window.clearTimeout(this.timeoutId);
            const { currentQuestion } = this.state;
            isGoodAnswer = GameUtil.verifyAnswer(answer, currentQuestion.type);
        }

        this.clientSocket.sendResult({result: isGoodAnswer, roomId: this.roomId})
    };

    displayScores = (roomData) => {
        this.setState(
            {
                display: {
                    lobby: false,
                    question: false,
                    answer: true,
                    gameOptions: false,
                },
                roomData,
                questionInputDisabled: false,
            }
        );
    };

    endGame = (roomData) => {
        clearInterval(this.timer);

        this.setState({
            display: {
                lobby: true,
                question: false,
                answer: false,
                gameOptions: false,
            },
            roomData,
            questionInputDisabled: false
        });
    }

    handleTimeLeft = (time) => {

        clearInterval(this.timer);

        let timeToDisplay = time / 1000;

        // console.log("TIME TO DISPLAY", timeToDisplay);

        this.setState({timeLeft: timeToDisplay})

        this.timer = setInterval(() => {

            //TODO Gerer time < 0
            time -= 1000;

            time > 0 ? timeToDisplay = time / 1000 : timeToDisplay = 1

            this.setState({timeLeft: timeToDisplay});

        }, 1000);

    }

    handlePlayerDisconnect = (host, players) => {
        const { roomData } = this.state;

        let { isHost } = this.state;

        const mixedRoomData = {...roomData, ...{host, players}};

        if (this.clientSocket.socket.id === mixedRoomData.host.socketId) isHost = true;

        this.setState({roomData: mixedRoomData, isHost});
    }

    changeOptions = (page) => {
        this.gameOptionsToLoad = page;
        this.setState({
            display: {
                lobby: false,
                question: false,
                answer: false,
                gameOptions: true,
            }
        })
    }

    generateCreateGameState = (page) => {
        let generatedState = {
            display: {
                gameMode: false,
                categories: false,
                options: false,
            },
            isLoading: false,
        };

        generatedState.display[page] = true;

        return generatedState;
    };


    componentWillUnmount() {

        Util.clearSessionStorage();

        if(this.state.socketOpen) {
            this.clientSocket.destructor();
            clearInterval(this.timer);
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
        } else if (display.gameOptions) {
            const generatedState = this.generateCreateGameState(this.gameOptionsToLoad);
            return (
                <>
                    <CreateGame fromRoom={true} roomInstance={this} generatedState={generatedState}/>
                </>
            )

        } else if (display.lobby) {

            return (
                <>
                    <Lobby isHost={isHost}
                           currentPlayer={currentPlayer}
                           roomData={roomData}
                           gameConfiguration={gameConfiguration}
                           startQuiz={this.startQuiz}
                           leaveRoom={this.leaveRoom}
                           changeOptions={this.changeOptions}
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
                              leaveRoom={this.leaveRoom}
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
                            leaveRoom={this.leaveRoom}
                    />
                </>
            )

        }
    }


}

export default Room;
