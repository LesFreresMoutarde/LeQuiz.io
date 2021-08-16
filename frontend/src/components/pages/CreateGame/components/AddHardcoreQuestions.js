import React from "react";

// TODO Mobile view
const AddHardcoreQuestions = ({withHardcoreQuestions, onHardcoreQuestionsChange}) => {
    return (
        <div className="game-options-container-secondary-row mt3">
            <label className="checkbox checkbox-solid" data-children-count="1">
                <input type="checkbox"
                       onChange={onHardcoreQuestionsChange}
                       checked={withHardcoreQuestions}
                />
                <span>Ajouter les questions "hardcore"</span>
            </label>
        </div>
    )
};

export default AddHardcoreQuestions;
