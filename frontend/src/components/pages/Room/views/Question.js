import React from "react";
import ClassicQuestion from "../components/Question/ClassicQuestion";
import Clock from "../components/Shared/Clock";
import '../../../../css/pages/question.css';
import QuitCross from "../../../misc/QuitCross";

const Question = ({currentQuestion, quizLength, submitAnswer, timeLeft, questionInputDisabled, leaveRoom, isQcmEnabled, enableQcm}) => {
    return (
        <div className="question-screen-container">
            <div className="question-screen-desktop-header">
                {currentQuestion.categories.map(categoryLabel => {
                    return (
                        <div key={categoryLabel} className="question-screen-desktop-header-item">
                            {categoryLabel}
                        </div>
                    )
                })}
            </div>
            <div className="question-screen-main-data-container">
                <div className="question-screen-left">
                    <div className="question-screen-desktop-clock-container">
                        <Clock timeLeft={timeLeft} />
                    </div>
                </div>
                <div className="question-screen-center">
                    {(() => {
                        switch(currentQuestion.type) {
                            case 'classic':
                                return (
                                    <ClassicQuestion question={currentQuestion}
                                                     quizLength={quizLength}
                                                     submitAnswer={submitAnswer}
                                                     userCanSubmit={!questionInputDisabled}
                                                     isQcmEnabled={isQcmEnabled}
                                                     enableQcm={enableQcm}
                                    />
                                )
                            default:
                                throw new Error('Unknown question type');
                        }
                    })()}
                </div>
                <div className="question-screen-right"/>
            </div>
            <div className="question-screen-desktop-footer">
                <QuitCross onClick={leaveRoom} />
            </div>
        </div>
    );
}

export default Question;
