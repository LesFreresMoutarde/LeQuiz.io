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
            gameConfiguration: this.createGameConfiguration()
        };

        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, this.state.gameConfiguration);
    }

    createGameConfiguration = () => {
        return {
            gameMode: '',
            categories: [],
            questionTypes: [],
            winCriterion: '',
            difficulty: null
        }
    };

    render() {
        return (
            <Switch>
                <Route exact path="/create-room/game-mode" component={ChooseGameMode}/>
                <Route exact path="/create-room/categories" component={ChooseCategories}/>
                <Route exact path="/create-room/options" component={ChooseOptions}/>
            </Switch>
        );
    }
}