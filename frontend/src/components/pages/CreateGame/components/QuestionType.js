import React from "react";

const QuestionType = ({type, evaluateWinCriterionMaxValue}) => {
    return (
        <>
            <input className="question-type-checkbox" type="checkbox"
                   id={`cbx-${type}`} value={type} onChange={() => evaluateWinCriterionMaxValue()}/>
            <span>{type}</span>
        </>)
};

export default QuestionType;