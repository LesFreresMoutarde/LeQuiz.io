import React from "react";

const QcmPick = ({answer, submitAnswer, disabled, colorIndex, pickedAnswer}) => {

    const getClasses = () => {
        if (pickedAnswer !== null && pickedAnswer.content !== answer.content) {

            return `question-answer-qcm-answer qcm-answer-color-${colorIndex} qcm-answer-disabled`;
        }

        return `question-answer-qcm-answer qcm-answer-color-${colorIndex}`;
    }

    const classes = getClasses();

    return (
        <div className="question-answer-qcm-answer-container">
            <button className={classes}
                    disabled={disabled}
                    onClick={() => submitAnswer(answer)}
            >
                {answer.content}
            </button>
        </div>
    )
};

export default QcmPick;
