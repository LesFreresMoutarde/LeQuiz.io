import React from "react";
import LobbyEditSettingsButton from "./LobbyEditSettingsButton";

const GameModeBox = ({gameMode, changeOptions, userCanEdit}) => {
    return (
        <div className="lobby-box">
            <div className="lobby-box-header">
                {userCanEdit &&
                <LobbyEditSettingsButton onClick={() => changeOptions('gameMode')}/>
                }
                <span className="lobby-box-header-label">Mode</span>
            </div>
            <div className="lobby-box-content">
                <p className="lobby-game-mode">{gameMode.label}</p>
            </div>

        </div>
    )
};

export default GameModeBox;
