import React from "react";
import GameModeBox from "../components/Lobby/GameModeBox";
import OptionsBox from "../components/Lobby/OptionsBox";
import PlayersBox from "../components/Lobby/PlayersBox";
import CategoriesBox from "../components/Lobby/CategoriesBox";

class Lobby extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <GameModeBox gameMode="toto"/>
                <OptionsBox options="options"/>
                <PlayersBox players="players"/>
                <CategoriesBox categories="categories"/>
            </div>
        );
    }

}

export default Lobby;