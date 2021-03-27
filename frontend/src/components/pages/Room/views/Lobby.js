import React from "react";
import GameModeBox from "../components/Lobby/GameModeBox";
import OptionsBox from "../components/Lobby/OptionsBox";
import PlayersBox from "../components/Lobby/PlayersBox";
import CategoriesBox from "../components/Lobby/CategoriesBox";
import NextButton from "../../../misc/NextButton";
import LeaveButton from "../components/Lobby/LeaveButton";
import GameUtil from "../../../../util/GameUtil";
import Util from "../../../../util/Util";

class Lobby extends React.Component {

    static LOBBY_TITLE = "Salon de jeu";


    constructor(props) {
        super(props);

        this.roomCodeHoverTimeout = null;
    }

    onRoomCodeMouseEnter = () => {
        const hiddenCodeMessage = document.getElementById('lobby-hidden-code-message');
        const codeSpan = document.getElementById('lobby-room-code');

        hiddenCodeMessage.classList.add('is-hover');
        this.roomCodeHoverTimeout = setTimeout(() => {
            codeSpan.classList.add('visible');
            hiddenCodeMessage.classList.remove('visible');
        }, 300);
    };

    onRoomCodeMouseLeave = () => {
        const hiddenCodeMessage = document.getElementById('lobby-hidden-code-message');
        const codeSpan = document.getElementById('lobby-room-code');

        clearTimeout(this.roomCodeHoverTimeout);
        hiddenCodeMessage.classList.remove('is-hover');
        codeSpan.classList.remove('visible');
        hiddenCodeMessage.classList.add('visible');
    }

    render() {
        const { roomData, gameConfiguration, currentPlayer,
            isHost, startQuiz, changeOptions, leaveRoom, roomId } = this.props;

            let displayClass = 'hidden';
            if (isHost) displayClass = 'visible';

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
                    <p className="lobby-room-code">
                        <span id="lobby-hover-to-show-code" onMouseEnter={this.onRoomCodeMouseEnter} onMouseLeave={this.onRoomCodeMouseLeave}>
                            <span id="lobby-hidden-code-message" className="visible">Survolez pour afficher le code du salon</span>
                            <span id="lobby-room-code">{roomId}</span>
                        </span>
                    </p>
                </div>
            </div>
        );
    }

}

export default Lobby;
