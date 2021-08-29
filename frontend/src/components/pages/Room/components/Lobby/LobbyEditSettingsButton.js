import React from "react";

const LobbyEditSettingsButton = ({onClick}) => {
    return (
        <button className="lobby-box-edit-button" onClick={onClick}>
            <img src="/img/icons/pencil.svg" alt="Modifier"/>
        </button>
    )
};

export default LobbyEditSettingsButton;
