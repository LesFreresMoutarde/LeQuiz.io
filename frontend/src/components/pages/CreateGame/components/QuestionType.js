import React from "react";

const QuestionType = ({name, label, pickQuestionType, checked}) => {
    return (
        <div className="question-type-wrapper">
            <label className="checkbox checkbox-solid">
                <input type="checkbox"
                       value={name}
                       onChange={() => pickQuestionType({
                           name: name,
                           checked: !checked})} checked={checked}/>
                <span>{label}</span>
            </label>
        </div>)
};

export default QuestionType;
