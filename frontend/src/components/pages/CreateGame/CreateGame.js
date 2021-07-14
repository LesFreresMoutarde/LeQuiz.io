import React from "react";
import '../../../css/pages/createGame.css';
import Util from "../../../util/Util";
import GameUtil from "../../../util/GameUtil";
import ChooseGameMode from "./views/ChooseGameMode";
import ChooseCategories from "./views/ChooseCategories";
import ChooseOptions from "./views/ChooseOptions";
import Loader from "../../misc/Loader";
import ApiUtil from "../../../util/ApiUtil";
import {app} from "../../App";

export default class CreateGame extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            display: {
                gameMode: false,
                categories: false,
                options: false,
            },
            isLoading: true,
        };
    }

    componentDidMount() {
        if (this.props.fromRoom) {
            this.setState(this.props.generatedState);

        } else {
            this.setState({
                display: {
                    gameMode: true,
                    categories: false,
                    options: false,
                },
                isLoading: false,
            });

            const gameConfiguration = this.createGameConfiguration();
            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);
        }

        app.showBackArrow(true, this.goBack);
    }

    createGameConfiguration = () => {
        return {
            gameMode: {},
            categories: [],
            questionTypes: [],
            winCriterion: null,
            roomCode: false,
            withHardcoreQuestions: null,
        }
    };

    submitGameMode = (gameMode) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        gameConfiguration.gameMode = gameMode;
        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

        if (!this.props.fromRoom) {
            this.setState({
                display: {
                    gameMode: false,
                    categories: true,
                    options: false
                }
            })
        } else {

            this.props.roomInstance.setState({
                display: {
                    lobby: true,
                    question: false,
                    answer: false,
                    gameOptions: false,
                },
                gameConfiguration
            });

            this.props.roomInstance.clientSocket.updateGameConfiguration(this.props.roomInstance.roomId)
        }


    };

    submitCategories = (categories) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        gameConfiguration.categories = categories;
        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

        if (!this.props.fromRoom) {
            this.setState({
                display: {
                    gameMode: false,
                    categories: false,
                    options: true,
                }
            })
        } else {
            this.props.roomInstance.setState({
                display: {
                    lobby: true,
                    question: false,
                    answer: false,
                    gameOptions: false,
                },
                gameConfiguration
            });

            this.props.roomInstance.clientSocket.updateGameConfiguration(this.props.roomInstance.roomId)
        }
    };

    submitOptions = async (questionTypes, winCriterionValue, withHardcoreQuestions) => {

        try {
            if (!this.props.fromRoom) {

                const response = await ApiUtil.performAPIRequest('game/rooms/create');

                if (!response.ok) throw new Error('Failed to generate an unique identifier for this room');

                const responseData = await response.json();

                const roomCode = responseData.roomCode;

                const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                gameConfiguration.winCriterion = parseInt(winCriterionValue, 10);
                gameConfiguration.questionTypes = questionTypes;
                gameConfiguration.withHardcoreQuestions = withHardcoreQuestions;
                gameConfiguration.roomCode = roomCode;

                Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

                this.props.history.push(`/room/${roomCode}`);

            } else {

                const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                gameConfiguration.winCriterion = parseInt(winCriterionValue, 10);
                gameConfiguration.questionTypes = questionTypes;
                gameConfiguration.withHardcoreQuestions = withHardcoreQuestions;
                Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

                this.props.roomInstance.setState({
                    display: {
                        lobby: true,
                        question: false,
                        answer: false,
                        gameOptions: false,
                    },
                    gameConfiguration
                });

                this.props.roomInstance.clientSocket.updateGameConfiguration(this.props.roomInstance.roomId)
            }
        } catch (e) {
            app.toastr.error('Impossible de créer un salon, réessayez ultérieurement')
        }

    };

    goBack = () => {
        const { display } = this.state;

        if (display.gameMode) {
            if (!this.props.fromRoom) {
                this.props.history.replace('/');
            } else {
                this.props.roomInstance.setState({
                    display: {
                        lobby: true,
                        question: false,
                        answer: false,
                        gameOptions: false,
                    }})
            }

            return;
        }

        if (display.categories) {
            if (!this.props.fromRoom) {
                this.setState({
                    display: {
                        gameMode: true,
                        categories: false,
                        options: false,
                    }

                })
            } else {
                this.props.roomInstance.setState({
                    display: {
                        lobby: true,
                        question: false,
                        answer: false,
                        gameOptions: false,
                    }})
            }

            return;
        }

        if (display.options) {
            if (!this.props.fromRoom) {
                this.setState({
                    display: {
                        gameMode: false,
                        categories: true,
                        options: false,
                    }

                })
            } else {
                this.props.roomInstance.setState({
                    display: {
                        lobby: true,
                        question: false,
                        answer: false,
                        gameOptions: false,
                    }})
            }
        }
    }

    componentWillUnmount() {

    }

    render() {

        const { display, isLoading } = this.state;

        if (isLoading) {
            return (
                <div className="app loading">
                    <div className="app-loader">
                        <Loader width="max(6vw, 80px)"/>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex-container-column" style={{height: '100%'}}>
                {(() => {
                    if (display.gameMode) {
                        return(<ChooseGameMode submit={this.submitGameMode} />)
                    } else if (display.categories) {
                        return(<ChooseCategories submit={this.submitCategories} />)
                    } else if (display.options) {
                        return(<ChooseOptions submit={this.submitOptions} />)
                    }
                })()}
            </div>
        );
    }
}
