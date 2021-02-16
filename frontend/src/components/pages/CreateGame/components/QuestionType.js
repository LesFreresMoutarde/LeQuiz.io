import React from "react";

const QuestionType = ({name, label, pickQuestionType, checked}) => {
    return (
        <div className="question-type-wrapper">
            {/*TODO Stylish Checkbox*/}
            <input className="question-type-checkbox" type="checkbox"
                   value={name}
                   onChange={() => pickQuestionType({
                       name: name,
                       checked: !checked})} checked={checked}/>
            <span className="question-type-name">{label}</span>
        </div>)
};

export default QuestionType;
