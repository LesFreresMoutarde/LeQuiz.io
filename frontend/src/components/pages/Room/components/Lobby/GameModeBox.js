import React from "react";
import EditLobbyButton from "./EditLobbyButton";

const GameModeBox = ({gameMode, changeOptions, userCanEdit}) => {
    return (
        <div className="lobby-box">
            <div className="lobby-box-header">
                <p className="lobby-box-header-label">Mode</p>
                {userCanEdit &&
                <button className="lobby-edit-button" onClick={() => changeOptions('gameMode')}>
                    <EditLobbyButton/>
                </button>
                }
            </div>
            <div className="lobby-box-content">
                <p className="lobby-game-mode">{gameMode.label}</p>
            </div>

        </div>
    )
};

export default GameModeBox;
