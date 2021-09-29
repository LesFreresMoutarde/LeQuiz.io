import React from "react";
import QuestionAnswerField from "./QuestionAnswerField";
import QuestionAnswerQCM from "./QuestionAnswerQCM";

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
                <div className="question-answers">
                    {!isQcmEnabled &&
                    <QuestionAnswerField enableQcm={enableQcm} submitAnswer={submitAnswer} />
                    }

                    {isQcmEnabled &&
                    <QuestionAnswerQCM />
                    }
                </div>
            </div>
        </div>
    )
}

export default ClassicQuestion;
