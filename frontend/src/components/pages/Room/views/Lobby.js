import React from "react";
import GameModeBox from "../components/Lobby/GameModeBox";
import OptionsBox from "../components/Lobby/OptionsBox";
import PlayersBox from "../components/Lobby/PlayersBox";
import CategoriesBox from "../components/Lobby/CategoriesBox";
// import ChooseCategories from "../../CreateGame/views/ChooseCategories";
import CreateGame from "../../CreateGame/CreateGame";

class Lobby extends React.Component {

    static LOBBY_TITLE = "Salon de jeu";

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            displayCreateGame: false,
        }
    }



    render() {
        if (this.state.displayCreateGame) {
            console.log('momo')
            return(
            <>
                <CreateGame fromLobby={true} lobbyInstance={this} history={this.props.history}/>
            </>
            )
        } else {
            return (
                <div>
                    <GameModeBox gameMode="toto"/>
                    <OptionsBox options="options"/>
                    <PlayersBox players="players"/>
                    <CategoriesBox categories="categories"/>
                    <button onClick={() => {this.setState({displayCreateGame: true})}}>Modifier</button>
                </div>
            );
        }

    }

}

export default Lobby;