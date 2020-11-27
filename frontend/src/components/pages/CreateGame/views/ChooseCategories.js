import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";


export default class ChooseCategories extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.history);
    }

    componentDidMount() {
        console.log("la conf de la game", Util.getObjectFromSessionStorage('gameConfiguration'))
        // Redirect to game mode si y a pas
        GameUtil.checkGameConfiguration(this.props.history);
    }

    render() {
        return (<p>Les catégories</p>)
    }
}