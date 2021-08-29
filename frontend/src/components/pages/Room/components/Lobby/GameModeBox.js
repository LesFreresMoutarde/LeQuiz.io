import React from "react";
import LobbyEditSettingsButton from "./LobbyEditSettingsButton";

const GameModeBox = ({gameMode, changeOptions, userCanEdit}) => {
    return (
        <div className="lobby-box lobby-box-gamemode">
            <div className="lobby-box-header">
                {userCanEdit &&
                <LobbyEditSettingsButton onClick={() => changeOptions('gameMode')}/>
                }
                <span className="lobby-box-header-label">Mode</span>
            </div>
            <div className="lobby-box-content">
                <span>{gameMode.label}</span>
            </div>

        </div>
    )
};

export default GameModeBox;
