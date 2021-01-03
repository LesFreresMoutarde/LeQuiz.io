import React from "react";
import GameModeBox from "../components/Lobby/GameModeBox";
import OptionsBox from "../components/Lobby/OptionsBox";
import PlayersBox from "../components/Lobby/PlayersBox";
import CategoriesBox from "../components/Lobby/CategoriesBox";
// import ChooseCategories from "../../CreateGame/views/ChooseCategories";
import CreateGame from "../../CreateGame/CreateGame";
import NextButton from "../../../misc/NextButton";
import LeaveButton from "../components/Lobby/LeaveButton";

class Lobby extends React.Component {

    static LOBBY_TITLE = "Salon de jeu";

    constructor(props) {
        super(props);
        console.log("propos",props);
    }

    componentDidMount() {

    }





    render() {
        const { roomData, gameConfiguration, currentPlayer, isHost, startQuiz, changeOptions, leaveRoom } = this.props;

        // console.log("lobbyData from lobby", lobbyData)
       /* if (displayCreateGame) {
            console.log('momo');
            return(
            <>
                <CreateGame fromLobby={true} lobbyInstance={this}/>
            </>
            )*/
        // } else {

            let displayClass = 'hidden';
            if(isHost) displayClass = 'visible';

            return (
                <div className="lobby-container">
                    <h1 className="text-center">Salon de jeu</h1>
                    <div className="lobby-info-container">
                        <div className="lobby-info-left-container">
                            <GameModeBox gameMode={gameConfiguration.gameMode}
                                         changeOptions={changeOptions}
                                         displayClass={displayClass}/>
                            <OptionsBox questionTypes={gameConfiguration.questionTypes}
                                        winCriterion={gameConfiguration.winCriterion}
                                        changeOptions={changeOptions}
                                        displayClass={displayClass}
                            />
                            <LeaveButton leaveRoom={leaveRoom}/>
                        </div>
                        <div className="lobby-info-center-container">
                            <PlayersBox players={roomData.players} host={roomData.host} currentPlayer={currentPlayer}/>
                        </div>
                        <div className="lobby-info-right-container">
                            <CategoriesBox categories={gameConfiguration.categories}
                                           changeOptions={changeOptions}
                                           displayClass={displayClass}
                            />
                            <NextButton onClick={startQuiz}
                                        sizeClass="large-button"
                                        content="Commencer"
                                        displayClass={displayClass}/>
                        </div>
                    </div>
                    <div>
                        CODE DE LA ROOM : {roomData.id} !!!
                    </div>
                </div>
            );
        //}

    }

}

export default Lobby;
