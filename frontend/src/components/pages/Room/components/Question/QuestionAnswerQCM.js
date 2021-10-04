import React from "react";

const QuestionAnswerQCM = ({question}) => {
    const answers = question.answer.answers.qcm;

    console.log(answers);

    return (
        <div className="question-answer-qcm-container">
            {answers.map((answer, index) => {
                return (
                    <div key={index} className="question-answer-qcm-answer">
                        {answer.content}
                    </div>
                )
            })}
        </div>
    );
}

export default QuestionAnswerQCM;
