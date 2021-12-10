import React from "react";
import GameModeBox from "../components/Lobby/GameModeBox";
import OptionsBox from "../components/Lobby/OptionsBox";
import PlayersBox from "../components/Lobby/PlayersBox";
import CategoriesBox from "../components/Lobby/CategoriesBox";
import NextButton from "../../../misc/NextButton";
import LeaveButton from "../components/Lobby/LeaveButton";
import '../../../../css/pages/lobby.css';
import RoomCode from "../components/Lobby/RoomCode";

class Lobby extends React.Component {

    static LOBBY_TITLE = "Salon";

    constructor(props) {
        super(props);

        this.roomCodeHoverTimeout = null;
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
                            <RoomCode code={roomId} />
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
                
            </div>
        );
    }

}

export default Lobby;
