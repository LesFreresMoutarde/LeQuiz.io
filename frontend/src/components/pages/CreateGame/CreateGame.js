import React from "react";
import {Route, Switch} from "react-router-dom";
import Util from "../../../util/Util";
import ChooseGameMode from "./views/ChooseGameMode";
import ChooseCategories from "./views/ChooseCategories";

export default class CreateGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameConfiguration: this.createGameConfiguration()
        }
    }

    componentDidMount() {
        Util.addObjectToSessionStorage('gameConfiguration', this.state.gameConfiguration);
        //console.log('la config de la game', this.state.gameConfiguration);
    }

    createGameConfiguration = () => {
        return {
            gameMode: '',
            categories: [],
            questionTypes: [],
            winCondition: '',
            difficulty: null
        }
    };

    render() {
        return (
            <Switch>
                <Route exact path="/create-room/game-mode" component={ChooseGameMode}/>
                <Route exact path="/create-room/categories" component={ChooseCategories}/>
            </Switch>
        );
    }
}