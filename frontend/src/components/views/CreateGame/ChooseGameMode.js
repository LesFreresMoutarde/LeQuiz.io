import React from "react";
import {Link} from "react-router-dom";
import Util from "../../../util/Util";


export default class ChooseGameMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameConfiguration: Util.getObjectFromLocalStorage('gameConfiguration')
        }
    }

    componentDidMount() {
        console.log('la config de la game', this.state.gameConfiguration)
    }

    render() {
        return (
            <>
                <p>Le mode de jeu</p>
                <Link to="/create-room/choose-categories">GoTo Categories</Link>
            </>
        )
    }
}