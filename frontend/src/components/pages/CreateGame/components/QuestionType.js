import React from "react";

const QuestionType = ({type, pickQuestionType, checked}) => {
    return (
        <div className="question-type-wrapper">
            {/*TODO Stylish Checkbox*/}
            <input className="question-type-checkbox" type="checkbox"
                   value={type}
                   onChange={() => pickQuestionType({
                       type: type,
                       checked: !checked})} checked={checked}/>
            <span className="question-type-name">{type}</span>
        </div>)
};

export default QuestionType;