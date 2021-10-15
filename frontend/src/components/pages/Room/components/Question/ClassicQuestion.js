import React from "react";
import QuestionAnswerField from "./QuestionAnswerField";
import QuestionAnswerQCM from "./QuestionAnswerQCM";
import QuestionContent from "./QuestionContent";

const ClassicQuestion = ({question, quizLength, submitAnswer, userCanSubmit, isQcmEnabled, enableQcm}) => {
    return (
        <div className="classic-question-container">
            <div className="question-content-container">
                <QuestionContent content={question.content} />
                <div className="question-counter">
                    Question {question.round} sur {quizLength}
                </div>
            </div>

            <div className="question-answers-container">
                <div className={`question-answers ${isQcmEnabled ? 'qcm' : ''}`}>
                    {!isQcmEnabled &&
                    <QuestionAnswerField enableQcm={enableQcm} submitAnswer={submitAnswer} />
                    }

                    {isQcmEnabled &&
                    <QuestionAnswerQCM question={question} submitAnswer={submitAnswer} userCanSubmit={userCanSubmit} />
                    }
                </div>
            </div>
        </div>
    )
}

export default ClassicQuestion;
