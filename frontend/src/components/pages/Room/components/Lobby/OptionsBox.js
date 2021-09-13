import React from "react";
import LobbyEditSettingsButton from "./LobbyEditSettingsButton";
import LobbyValue from "./LobbyValue";

const OptionsBox = ({questionTypes, winCriterion, changeOptions, userCanEdit}) => {
    return (
        <div className="lobby-box lobby-box-options">
            <div className="lobby-box-header">
                {userCanEdit &&
                    <LobbyEditSettingsButton onClick={() => changeOptions('options')} />
                }
                <span className="lobby-box-header-label">Options</span>
            </div>
            <div className="lobby-box-content">
                <p className="lobby-options-label">Nombre de questions <span className="lobby-win-criterion">{winCriterion}</span></p>
                <p className="lobby-options-label">Types de questions</p>
                <div className="lobby-value-container">
                    {questionTypes.map((questionType, index) => (
                        <LobbyValue key={index} value={questionType.label}/>
                        )
                     )}
                </div>
            </div>
        </div>
    )
};

export default OptionsBox;
