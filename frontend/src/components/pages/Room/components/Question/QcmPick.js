import React from "react";

const QcmPick = ({answer, submitAnswer, disabled, colorClass}) => {

    return (
        <div className="question-answer-qcm-answer-container">
            <button className="question-answer-qcm-answer" disabled={disabled} onClick={() => submitAnswer(answer)}>
                {answer.content}
            </button>
        </div>
    )
};

export default QcmPick;
