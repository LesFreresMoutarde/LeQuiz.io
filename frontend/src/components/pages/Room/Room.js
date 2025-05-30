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
import AuthUtil from "../../../util/AuthUtil";
import ApiUtil from "../../../util/ApiUtil";
import {app} from "../../App";
import AudioPlayer from "../../../manager/AudioPlayer";

class Room extends React.Component {

    clientSocket;
    roomId;
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
            lastQuestionAnswer: {
                answer: null,
                wasCorrect: false,
                wasQcm: false,
            },
            questionInputDisabled: false,
            isQcmEnabled: false
        }
    }

    componentDidMount() {
        (async () => {
            try {
                const roomId  = this.props.match.params.id;
                let isHost = false;
                let username = null;

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

                const roomIdResponse = await ApiUtil.performAPIRequest(`game/rooms/verify/${roomId}`);

                if (!roomIdResponse.ok) throw new Error('Cannot join this room');

                const { isRoomValid } = await roomIdResponse.json();

                if (!isRoomValid) throw new Error('This room doesn\'t exist' );

                const user = AuthUtil.accessTokenPayload.user;

                if (user) username = user.username

                this.roomId = roomId;

                this.clientSocket = new ClientSocket();

                this.clientSocket.connectToRoom(roomId, username, isHost);

                this.clientSocket.handleSocketCommunication(this);

                this.setState({socketOpen: true});

                AudioPlayer.playSound('enterRoom');

            } catch (error) {
                app.toastr.error('Impossible de rejoindre cette room');
                this.props.history.replace('/');
            }
        })()

        app.showBackArrow(false);
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
            currentQuestion,
            lastQuestionAnswer: {
                answer: null,
                wasCorrect: false,
                wasQcm: false,
            },
        });
    };

    submitAnswer = (answer = null) => {
        const { isQcmEnabled } = this.state;
        let roundPoints = 0;

        if (answer) {
            const { currentQuestion } = this.state;

            roundPoints = GameUtil.getRoundPoints(answer, currentQuestion, isQcmEnabled);

            AudioPlayer.playSound('sendAnswer');

            this.setState({
                questionInputDisabled: true,
                lastQuestionAnswer: {
                    answer: isQcmEnabled ? answer.content : answer,
                    wasCorrect: roundPoints > 0,
                    wasQcm: isQcmEnabled,
                },
            });
        }

        this.clientSocket.sendResult({roundPoints: roundPoints, roomId: this.roomId})
    };

    displayScores = (roomData) => {

        this.playSoundAtDisplayScores(roomData.quizLength);

        this.setState({
            display: {
                lobby: false,
                question: false,
                answer: true,
                gameOptions: false,
            },
            roomData,
            questionInputDisabled: false,
            isQcmEnabled: false
        });
    };

    playSoundAtDisplayScores = (quizLength) => {
        const { lastQuestionAnswer, currentQuestion } = this.state;

        if (currentQuestion.round === quizLength) {
            AudioPlayer.playSound('endGame');
        } else {
            lastQuestionAnswer.wasCorrect
                ? AudioPlayer.playSound('goodAnswer')
                : AudioPlayer.playSound('badAnswer')
            ;
        }
    }

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

        this.setState({timeLeft: timeToDisplay})

        this.timer = setInterval(() => {

            time -= 1000;

            if (time === 3000 && this.state.display.question) AudioPlayer.playSound('timer');

            time > 0 ? timeToDisplay = time / 1000 : timeToDisplay = 1

            this.setState({timeLeft: timeToDisplay});

        }, 1000);

    }

    handlePlayerDisconnect = (roomData) => {

        let { isHost } = this.state;

        if (this.clientSocket.socket.id === roomData.host.socketId) isHost = true;

        this.setState({roomData, isHost});
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

    enableQcm = () => {
        this.setState({isQcmEnabled: true});
    }

    async componentWillUnmount() {
        Util.clearSessionStorage();

        AudioPlayer.killPlayers();

        if (this.state.socketOpen) {
            this.clientSocket.destructor(this.roomId);
            clearInterval(this.timer);
        }
    }

    render() {
        const {
            isLoading, display, roomData, gameConfiguration,
            currentPlayer, isHost, currentQuestion, timeLeft,
            questionInputDisabled, isQcmEnabled
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
                           roomId={this.roomId}
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
                              quizLength={roomData.quizLength}
                              submitAnswer={this.submitAnswer}
                              timeLeft={timeLeft}
                              questionInputDisabled={questionInputDisabled}
                              leaveRoom={this.leaveRoom}
                              isQcmEnabled={isQcmEnabled}
                              enableQcm={this.enableQcm}
                    />
                </>
            )

        } else if (display.answer) {

            const {lastQuestionAnswer} = this.state;

            return (
                <>
                    <Answer roomData={roomData}
                            currentQuestion={currentQuestion}
                            quizLength={roomData.quizLength}
                            currentPlayer={currentPlayer}
                            playerAnswer={lastQuestionAnswer}
                            timeLeft={timeLeft}
                            leaveRoom={this.leaveRoom}
                    />
                </>
            )

        }
    }


}

export default Room;
