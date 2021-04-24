import React from "react";

const QcmPick = ({answer, submitAnswer, disabled, colorClass}) => {

    return (
        <button className={`qcm-box ${colorClass}`} onClick={() => submitAnswer(answer)} disabled={disabled}>
            <p className="qcm-answer">{answer.content}</p>
        </button>
    )
};

export default QcmPick;
