import React from "react";
import GameModeBox from "../components/Lobby/GameModeBox";
import OptionsBox from "../components/Lobby/OptionsBox";
import PlayersBox from "../components/Lobby/PlayersBox";
import CategoriesBox from "../components/Lobby/CategoriesBox";
import NextButton from "../../../misc/NextButton";
import LeaveButton from "../components/Lobby/LeaveButton";

class Lobby extends React.Component {

    static LOBBY_TITLE = "Salon de jeu";


    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
    }

    onMouseEnter = () => {
        this.setState({hover: true});
    };

    onMouseLeave = () => {
        this.setState({hover: false});
    }

    render() {
        const { roomData, gameConfiguration, currentPlayer, isHost, startQuiz, changeOptions, leaveRoom } = this.props;
        const { hover } = this.state;

            let displayClass = 'hidden';
            if(isHost) displayClass = 'visible';

        const roomCodeText = hover ? roomData.id : 'Survolez pour afficher le code du salon';

        return (
            <div className="lobby-container">
                <div className="lobby-title">
                    <h1>{Lobby.LOBBY_TITLE}</h1>
                </div>
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
                    <p className="lobby-room-code" onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()}>{roomCodeText}</p>
                </div>
            </div>
        );
    }

}

export default Lobby;
