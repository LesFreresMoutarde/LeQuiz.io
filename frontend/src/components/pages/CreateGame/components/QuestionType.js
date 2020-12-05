import React from "react";

const QuestionType = ({type}) => {
    return (
        <>
            <input className="question-type-checkbox" type="checkbox" id={`cbx-${type}`} value={type}/>
            <span>{type}</span>
        </>)
}

export default QuestionType;