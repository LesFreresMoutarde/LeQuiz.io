import React from "react";

const AddHardcoreQuestions = ({withHardcoreQuestions, onHardcoreQuestionsChange}) => {
    return (
        <div className="game-options-container-secondary-row mt3">
            <div className="game-options-main-block-title game-options-mobile-title">Questions "hardcore"</div>

            <div className="game-options-desktop-section game-options-hardcore-questions-wrapper">
                <label className="checkbox checkbox-solid" data-children-count="1">
                    <input type="checkbox"
                           onChange={onHardcoreQuestionsChange}
                           checked={withHardcoreQuestions}
                    />
                    <span>Ajouter les questions "hardcore"</span>
                </label>
            </div>

            <div className="game-options-mobile-section text-center">
                <label className="toggle" data-children-count="1">
                    <input type="checkbox"
                           onChange={onHardcoreQuestionsChange}
                           checked={withHardcoreQuestions}
                    />
                    <span>
                        {withHardcoreQuestions ? 'Avec' : 'Sans'}
                    </span>
                </label>
            </div>
        </div>
    )
};

export default AddHardcoreQuestions;
