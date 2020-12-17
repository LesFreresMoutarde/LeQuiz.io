import React from "react";
import GameModeBox from "../components/Lobby/GameModeBox";
import OptionsBox from "../components/Lobby/OptionsBox";
import PlayersBox from "../components/Lobby/PlayersBox";
import CategoriesBox from "../components/Lobby/CategoriesBox";
// import ChooseCategories from "../../CreateGame/views/ChooseCategories";
import CreateGame from "../../CreateGame/CreateGame";
import NextButton from "../../../misc/NextButton";

class Lobby extends React.Component {

    static LOBBY_TITLE = "Salon de jeu";

    constructor(props) {
        super(props);
        console.log("propos",props);
        this.state = {
            displayCreateGame: false,
            // lobbyData: this.props.roomData,
            // gameConfiguration: this.props.gameConfiguration,
            // currentPlayer: this.props.currentPlayer,
            // isHost: this.props.isHost
        };
        console.log("state lobby", this.state);
    }

    componentDidMount() {

    }



    render() {
        const { displayCreateGame } = this.state;
        const { roomData, gameConfiguration, currentPlayer, isHost, startQuiz } = this.props;
        console.log('gameConfigFromLobby',gameConfiguration);
        // console.log("lobbyData from lobby", lobbyData)
        if (displayCreateGame) {
            console.log('momo');
            return(
            <>
                <CreateGame fromLobby={true} lobbyInstance={this}/>
            </>
            )
        } else {

            let displayClass = 'hidden';
            if(isHost) displayClass = 'visible';

            return (
                <div>
                    <GameModeBox gameMode={gameConfiguration.gameMode}/>
                    <OptionsBox questionTypes={gameConfiguration.questionTypes} winCriterion={gameConfiguration.winCriterion}/>
                    <PlayersBox players={roomData.players} host={roomData.host} currentPlayer={currentPlayer}/>
                    <CategoriesBox categories={gameConfiguration.categories}/>
                    <NextButton onClick={startQuiz}
                                sizeClass="large-button"
                                content="Commencer"
                                displayClass={displayClass}/>
                    {/*<button onClick={() => {this.setState({displayCreateGame: true})}}>Modifier</button>*/}
                </div>
            );
        }

    }

}

export default Lobby;