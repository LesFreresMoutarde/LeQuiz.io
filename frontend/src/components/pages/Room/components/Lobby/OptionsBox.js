import React from "react";
import LobbyEditSettingsButton from "./LobbyEditSettingsButton";
import LobbyValue from "./LobbyValue";

const OptionsBox = ({questionTypes, winCriterion, withHardcoreQuestions, changeOptions, userCanEdit}) => {
    return (
        <div className="lobby-box lobby-box-options">
            <div className="lobby-box-header">
                {userCanEdit &&
                    <LobbyEditSettingsButton onClick={() => changeOptions('options')} />
                }
                <span className="lobby-box-header-label">Options</span>
            </div>
            <div className="lobby-box-content">
                <section>
                    <div className="lobby-options-label">Types de questions</div>
                    <div className="lobby-value-container">
                        {questionTypes.map((questionType, index) => (
                                <LobbyValue key={index} value={questionType.label}/>
                            )
                        )}
                    </div>
                </section>

                <section>
                    <div className="lobby-options-label">Questions "hardcore"</div>
                    <div className="lobby-value-container">
                        {withHardcoreQuestions &&
                            "Avec"
                        }

                        {!withHardcoreQuestions &&
                            "Sans"
                        }
                    </div>
                </section>

                <p className="lobby-options-label">Nombre de questions <span className="lobby-win-criterion">{winCriterion}</span></p>

            </div>
        </div>
    )
};

export default OptionsBox;
