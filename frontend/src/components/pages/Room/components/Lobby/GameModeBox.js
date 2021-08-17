import React from "react";
import EditLobbyButton from "./EditLobbyButton";

const GameModeBox = ({gameMode, changeOptions, displayClass}) => {
    return (
        <div className="lobby-box">
            <div className="lobby-box-header">
                <p className="lobby-box-header-label">Mode</p>
                <button className={`${displayClass} lobby-edit-button`} onClick={() => changeOptions('gameMode')}>
                    <EditLobbyButton/>
                </button>
            </div>
            <div className="lobby-box-content">
                <p className="lobby-game-mode">{gameMode.label}</p>
            </div>

        </div>
    )
};

export default GameModeBox;
