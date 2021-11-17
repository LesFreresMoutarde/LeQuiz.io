import React from "react";
import GameModeBox from "../components/Lobby/GameModeBox";
import OptionsBox from "../components/Lobby/OptionsBox";
import PlayersBox from "../components/Lobby/PlayersBox";
import CategoriesBox from "../components/Lobby/CategoriesBox";
import NextButton from "../../../misc/NextButton";
import LeaveButton from "../components/Lobby/LeaveButton";
import '../../../../css/pages/lobby.css';

class Lobby extends React.Component {

    static LOBBY_TITLE = "Salon";

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

        return (
            <div className="lobby-container">
                <div className="lobby-title">
                    <h1>{Lobby.LOBBY_TITLE}</h1>
                </div>

                <div className="lobby-data-mobile-scrollable-container">
                    <div className="lobby-data-container">
                        <aside className="lobby-secondary-data">
                            <GameModeBox gameMode={gameConfiguration.gameMode}
                                         changeOptions={changeOptions}
                                         userCanEdit={isHost}
                            />
                            <CategoriesBox categories={gameConfiguration.categories}
                                           changeOptions={changeOptions}
                                           userCanEdit={isHost}
                            />
                        </aside>
                        <div className="lobby-main-data">
                            <PlayersBox players={roomData.players} host={roomData.host} currentPlayer={currentPlayer}/>
                        </div>
                        <aside className="lobby-secondary-data">
                            <OptionsBox questionTypes={gameConfiguration.questionTypes}
                                        winCriterion={gameConfiguration.winCriterion}
                                        withHardcoreQuestions={gameConfiguration.withHardcoreQuestions}
                                        changeOptions={changeOptions}
                                        userCanEdit={isHost}
                            />
                        </aside>
                    </div>
                </div>

                <div className="lobby-footer">
                    <LeaveButton onClick={leaveRoom} className="button large red" content="Quitter"/>
                    {isHost &&
                        <NextButton onClick={startQuiz} className="button large green" content="Commencer"/>
                    }
                </div>



                {/*<div className="lobby-info-container">*/}
                {/*    <div className="lobby-info-left-container">*/}
                {/*        <GameModeBox gameMode={gameConfiguration.gameMode}*/}
                {/*                     changeOptions={changeOptions}*/}
                {/*                     displayClass={displayClass}/>*/}
                {/*        <OptionsBox questionTypes={gameConfiguration.questionTypes}*/}
                {/*                    winCriterion={gameConfiguration.winCriterion}*/}
                {/*                    changeOptions={changeOptions}*/}
                {/*                    displayClass={displayClass}*/}
                {/*        />*/}
                {/*        <LeaveButton onClick={leaveRoom} className="button large-button red" content="Quitter"/>*/}
                {/*    </div>*/}
                {/*    <div className="lobby-info-center-container">*/}
                {/*        <PlayersBox players={roomData.players} host={roomData.host} currentPlayer={currentPlayer}/>*/}
                {/*    </div>*/}
                {/*    <div className="lobby-info-right-container">*/}
                {/*        <CategoriesBox categories={gameConfiguration.categories}*/}
                {/*                       changeOptions={changeOptions}*/}
                {/*                       displayClass={displayClass}*/}
                {/*        />*/}
                {/*        <NextButton onClick={startQuiz}*/}
                {/*                    className="button large-button green"*/}
                {/*                    content="Commencer" />*/}
                {/*    </div>*/}
                {/*</div>*/}



                {/*<div>*/}
                {/*    <p className="lobby-room-code">*/}
                {/*        <span id="lobby-hover-to-show-code" onMouseEnter={this.onRoomCodeMouseEnter} onMouseLeave={this.onRoomCodeMouseLeave}>*/}
                {/*            <span id="lobby-hidden-code-message" className="visible">Survolez pour afficher le code du salon</span>*/}
                {/*            <span id="lobby-room-code">{roomId}</span>*/}
                {/*        </span>*/}
                {/*    </p>*/}
                {/*</div>*/}
            </div>
        );
    }

}

export default Lobby;
