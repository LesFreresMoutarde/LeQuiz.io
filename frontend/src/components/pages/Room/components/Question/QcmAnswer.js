import React from "react";

const QcmAnswer = ({answer, submitAnswer}) => {
    return (<button onClick={() => submitAnswer(answer)}>{answer.content}</button>)
};

export default QcmAnswer;