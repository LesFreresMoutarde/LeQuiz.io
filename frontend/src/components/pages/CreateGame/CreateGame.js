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

    submitGameConfigurationElement = (elementName, elementValue) => {
        let gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);

        switch (elementName) {
            case 'gameMode':
            case 'categories':
                gameConfiguration[elementName] = elementValue;
                this.goNext(gameConfiguration, elementName);
                break;
            case 'options':
                const { questionTypes, winCriterionInputValue, withHardcoreQuestions } = elementValue;

                gameConfiguration.winCriterion = parseInt(winCriterionInputValue, 10);
                gameConfiguration.questionTypes = questionTypes;
                gameConfiguration.withHardcoreQuestions = withHardcoreQuestions;

                this.goNext(gameConfiguration, elementName);
                break;
            default:
                this.props.history.replace('/');
                break;
        }

    }

    goNext = (gameConfiguration, elementName) => {
        // Traditional user journey
        if (!this.props.fromRoom) {
            const navigationFlow = ['gameMode', 'categories', 'options', 'lobby'];
            const nextPage = navigationFlow[navigationFlow.indexOf(elementName) + 1];

            // Simple navigation "push"
            if (nextPage !== 'lobby') {
                Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

                this.setState({
                    display: {
                        gameMode: 'gameMode' === nextPage,
                        categories: 'categories' === nextPage,
                        options: 'options' === nextPage,
                    }
                })

                return;
            }

            // Room Creation
            (async () => {
                try {
                    await this.handleGoNextToLobby(gameConfiguration)
                } catch (e) {
                    app.toastr.error('Impossible de créer un salon, réessayez ultérieurement\'')
                    this.props.history.replace('/');
                }
            })();

            return;
        }

        // User came from lobby
        this.handleGoNextFromLobby(gameConfiguration);
    }

    handleGoNextToLobby = async (gameConfiguration) => {
        const response = await ApiUtil.performAPIRequest('game/rooms/create');

        if (!response.ok) throw new Error('Failed to generate an unique identifier for this room');

        const responseData = await response.json();

        const roomCode = responseData.roomCode;

        gameConfiguration.roomCode = roomCode;

        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

        this.props.history.push(`/room/${roomCode}`);
    }

    handleGoNextFromLobby = (gameConfiguration) => {
        const validGameConfiguration = GameUtil.validateInRoomModifiedGameConfiguration(
            JSON.parse(JSON.stringify(gameConfiguration))
        );

        this.props.roomInstance.setState({
            display: {
                lobby: true,
                question: false,
                answer: false,
                gameOptions: false,
            },
            gameConfiguration: validGameConfiguration
        });

        app.showBackArrow(false);

        this.props.roomInstance.clientSocket.updateGameConfiguration(this.props.roomInstance.roomId);
    }

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

                app.showBackArrow(false);
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

                app.showBackArrow(false);
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

                app.showBackArrow(false);
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
                        return(<ChooseGameMode submit={this.submitGameConfigurationElement} />)
                    } else if (display.categories) {
                        return(<ChooseCategories submit={this.submitGameConfigurationElement} />)
                    } else if (display.options) {
                        return(<ChooseOptions submit={this.submitGameConfigurationElement} />)
                    }
                })()}
            </div>
        );
    }
}
