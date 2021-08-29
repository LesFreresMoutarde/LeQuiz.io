import React from "react";
import LobbyEditSettingsButton from "./LobbyEditSettingsButton";
import LobbyValue from "./LobbyValue";

const OptionsBox = ({questionTypes, winCriterion, changeOptions, displayClass}) => {
    return (
        <div className="lobby-box">
            <div className="lobby-box-header">
                <p className="lobby-box-header-label">Options</p>
                <button className={`${displayClass} lobby-edit-button`} onClick={() => changeOptions('options')}>
                    <LobbyEditSettingsButton/>
                </button>
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
