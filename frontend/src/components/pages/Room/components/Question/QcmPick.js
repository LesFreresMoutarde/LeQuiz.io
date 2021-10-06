import React from "react";

const QcmPick = ({answer, submitAnswer, disabled, colorIndex}) => {

    return (
        <div className="question-answer-qcm-answer-container">
            <button className={`question-answer-qcm-answer qcm-answer-color-${colorIndex}`}
                    disabled={disabled}
                    onClick={() => submitAnswer(answer)}
            >
                {answer.content}
            </button>
        </div>
    )
};

export default QcmPick;
