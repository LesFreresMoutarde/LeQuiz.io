import React, {useEffect} from "react";
import QcmPick from "./QcmPick";

const QuestionAnswerQCM = ({question, userCanSubmit, submitAnswer}) => {
    const answers = question.answer.answers.qcm;

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
