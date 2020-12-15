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
        console.log('props CreateGame', props)
        this.state = {
            display: {
                gameMode: true,
                categories: false,
                options: false,
            }
        };
        //TODO a conditionner pour le retour depuis le Lobby
        if (this.props.fromLobby) {
            console.log("on vient du lobby");
        } else {
            const gameConfiguration = this.createGameConfiguration()
            Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);
        }

        console.log('tmoinito')

    }

    createGameConfiguration = () => {
        return {
            gameMode: '',
            categories: [],
            questionTypes: [],
            winCriterion: '',
            difficulty: null,
            isHost: true,
        }
    };

    submitGameMode = (gameMode) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        gameConfiguration.gameMode = gameMode;
        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);
;
        this.setState({
            display: {
                gameMode: false,
                categories: true,
                options: false
            }
        })
        //TODO Gerer le cas où l'utilisateur vient du lobby
        //this.props.history.push('/create-room/categories');
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
        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

        if (this.props.fromLobby) {
            this.props.lobbyInstance.setState({
                displayCreateGame: false,
            })
        } else {
            this.props.history.push(`/room/${roomCode}`);
        }

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