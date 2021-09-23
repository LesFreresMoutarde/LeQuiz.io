import React from "react";

const ClassicQuestion = ({question, submitAnswer, userCanSubmit, isQcmEnabled, enableQcm}) => {
    console.log(question);

    return (
        <div className="classic-question-container">
            <div className="question-content-container">
                <div className="question-content">
                    {question.content}
                </div>
                <div className="question-counter">
                    Question X sur Y
                </div>
            </div>

            <div className="question-answers-container">
                Answers
            </div>


        </div>
    )
}

export default ClassicQuestion;
