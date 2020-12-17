import React from "react";
import {Route, Switch} from "react-router-dom";
import Util from "../../../util/Util";
import GameUtil from "../../../util/GameUtil";
import ChooseGameMode from "./views/ChooseGameMode";
import ChooseCategories from "./views/ChooseCategories";
import ChooseOptions from "./views/ChooseOptions";

export default class CreateGame extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            display: {
                gameMode: true,
                categories: false,
                options: false,
            },
        };
    }

    componentDidMount() {
        if (this.props.fromLobby) {
            console.log("on vient du lobby");
        } else {
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

        this.setState({
            display: {
                gameMode: false,
                categories: true,
                options: false
            }
        })
    }

    submitCategories = (categories) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        gameConfiguration.categories = categories;
        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

        this.setState({
            display: {
                gameMode: false,
                categories: false,
                options: true,
            }
        })
    }

    submitOptions = (questionTypes, winCriterionValue, roomCode) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        gameConfiguration.winCriterion = winCriterionValue;
        gameConfiguration.questionTypes = questionTypes;
        gameConfiguration.roomCode = roomCode;

        if (this.props.fromLobby) {
            delete gameConfiguration.roomCode;
            this.props.lobbyInstance.setState({
                displayCreateGame: false,
                gameConfiguration: gameConfiguration
            })
            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration)
        } else {
            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration)
            this.props.history.push(`/room/${roomCode}`);
        }

        //Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration)

    }

    componentWillUnmount() {
        console.log("GAME UNMOUNT !!!!")
    }

    render() {
        const { display } = this.state;

        if (display.gameMode) {

            return(<ChooseGameMode submit={this.submitGameMode}/>)

        } else if (display.categories) {

            return(<ChooseCategories submit={this.submitCategories}/>)

        } else if (display.options) {

            return(<ChooseOptions submit={this.submitOptions}/>)

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