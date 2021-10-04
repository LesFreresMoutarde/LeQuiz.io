import React from "react";
import QcmPick from "./QcmPick";

const QuestionAnswerQCM = ({question, userCanSubmit, submitAnswer}) => {
    const answers = question.answer.answers.qcm;

    console.log(answers);

    return (
        <div className="question-answer-qcm-container">
            {answers.map((answer, index) => {
                return (
                    <QcmPick key={index}
                             answer={answer}
                             disabled={!userCanSubmit}
                             submitAnswer={submitAnswer}
                    />
                )
            })}
        </div>
    );
}

export default QuestionAnswerQCM;
