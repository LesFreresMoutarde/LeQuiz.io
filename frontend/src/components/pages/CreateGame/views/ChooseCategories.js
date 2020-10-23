import React from "react";
import Util from "../../../../util/Util";


export default class ChooseCategories extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log("la conf de la game", Util.getObjectFromSessionStorage('gameConfiguration'))
        // Redirect to game mode si y a pas
    }

    render() {
        return (<p>Les catégories</p>)
    }
}