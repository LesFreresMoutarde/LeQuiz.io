import React from "react";
import {Link} from "react-router-dom";
import EditLobbyButton from "./EditLobbyButton";
import LobbyValue from "./LobbyValue";

const OptionsBox = ({questionTypes, winCriterion, changeOptions, displayClass}) => {
    const tt = ['qcm', 'blind-test', 'input', 'toto', 'momo', 'mimi']
    return (
        <div className="lobby-box">
            <div className="lobby-box-header">
                <p className="lobby-box-header-label">Options de jeu</p>
                <button className={`${displayClass} lobby-edit-button`} onClick={() => changeOptions('options')}>
                    <EditLobbyButton/>
                </button>
            </div>
            <div className="lobby-box-content">
                <p className="lobby-options-label">Nombre de questions : <span className="lobby-win-criterion">{winCriterion}</span></p>
                <p className="lobby-options-label">Types de questions</p>
                <div className="lobby-value-container">
                    {tt.map((questionType, index) => (
                            // <p key={index}>{questionType.type}</p>
                            <LobbyValue key={index} value={questionType}/>
                        )
                    )}
                </div>
            </div>
        </div>
    )
};

export default OptionsBox;
