import React from "react";
import Util from "../../../util/Util";
import GameUtil from "../../../util/GameUtil";
import ChooseGameMode from "./views/ChooseGameMode";
import ChooseCategories from "./views/ChooseCategories";
import ChooseOptions from "./views/ChooseOptions";
import Loader from "../../misc/Loader";

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
            console.log("on vient de la room");
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
    }

    createGameConfiguration = () => {
        return {
            gameMode: '',
            categories: [],
            questionTypes: [],
            winCriterion: '',
            difficulty: null,
            roomCode: false,
        }
    };

    submitGameMode = (gameMode) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        console.log('gameConfigurationSubmitGameMode', gameConfiguration);
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
            // Emettre un evenement socket ?
            // changer la game configuration du state
            this.props.roomInstance.setState({
                display: {
                    lobby: true,
                    question: false,
                    answer: false,
                    gameOptions: false,
                },
                gameConfiguration
            });

            this.props.roomInstance.socket.updateGameConfiguration(this.props.roomInstance.roomId)
        }


    }

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

            this.props.roomInstance.socket.updateGameConfiguration(this.props.roomInstance.roomId)
        }
    };

    submitOptions = (questionTypes, winCriterionValue, roomCode) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        gameConfiguration.winCriterion = winCriterionValue;
        gameConfiguration.questionTypes = questionTypes;
        gameConfiguration.roomCode = roomCode;

        if (!this.props.fromRoom) {

            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

            this.props.history.push(`/room/${roomCode}`);

        } else {

            delete gameConfiguration.roomCode;
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

            this.props.roomInstance.socket.updateGameConfiguration(this.props.roomInstance.roomId)

        }
    };

    goBack = (page) => {
        // prends la page en param. SELON elle affiche la bonne précédente
        // SI PAGE = 'chooseGameMode' ALORS regardez si on vient du lobby (room) ou NON
        // SI PAGE = 'chooseOptions' ALORS Emettre event socket si c'est une modif de la configuration
        switch (page) {
            case 'chooseGameMode':

                break;
            case 'chooseCategories':
                break;
            case 'chooseOptions':
                break;
        }
    }

    componentWillUnmount() {
        console.log("GAME UNMOUNT !!!!")
    }

    render() {
        // Passer from lobby
        const { display, isLoading } = this.state;

        if (isLoading) {
            return (
                <>
                    <div className="app loading">
                        <div className="app-loader">
                            <Loader width="max(6vw, 80px)"/>
                        </div>
                    </div>
                </>
            );
        }


        if (display.gameMode) {

            return(<ChooseGameMode submit={this.submitGameMode} goBack={this.goBack}/>)

        } else if (display.categories) {

            return(<ChooseCategories submit={this.submitCategories} goBack={this.goBack}/>)

        } else if (display.options) {

            return(<ChooseOptions submit={this.submitOptions} goBack={this.goBack}/>)

        }

        /* PREVIOUS LOGIC

        return (
            <Switch>
                <Route exact path="/create-room/game-mode" component={ChooseGameMode}/>
                <Route exact path="/create-room/categories" component={ChooseCategories}/>
                <Route exact path="/create-room/options" component={ChooseOptions}/>
            </Switch>
        );*/
    }
}
