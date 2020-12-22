import React from "react";

const QcmAnswer = ({answer, submitAnswer, disabled}) => {
    return (<button onClick={() => submitAnswer(answer)} disabled={disabled}>{answer.content}</button>)
};

export default QcmAnswer;
