import React from "react";
import LobbyEditSettingsButton from "./LobbyEditSettingsButton";

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
                    <div className="lobby-options-question-types-container">
                        {questionTypes.map((questionType, index) => (
                            <div className="lobby-options-question-type" key={index}>
                                {questionType.label}
                            </div>
                            )
                        )}
                    </div>
                </section>

                <section>
                    <div className="lobby-options-label">Questions "hardcore"</div>
                    <div className="lobby-options-with-hardcore-questions-value-container">
                        <div className="lobby-options-with-hardcore-questions-value">
                            {withHardcoreQuestions &&
                            "Avec"
                            }

                            {!withHardcoreQuestions &&
                            "Sans"
                            }
                        </div>
                    </div>
                </section>

                <section>
                    <div className="lobby-options-label">Nombre de questions</div>
                    <div className="lobby-value-container lobby-options-win-criterion">
                        {winCriterion}
                    </div>
                </section>

            </div>
        </div>
    )
};

export default OptionsBox;
