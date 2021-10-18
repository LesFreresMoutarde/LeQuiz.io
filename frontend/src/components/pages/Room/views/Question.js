import React, {useEffect} from "react";
import ClassicQuestion from "../components/Question/ClassicQuestion";
import Clock from "../components/Shared/Clock";
import '../../../../css/pages/question.css';
import QuitCross from "../../../misc/QuitCross";
import {app} from "../../../App";
import QuestionDesktopHeader from "../components/Shared/QuestionDesktopHeader";

const Question = ({currentQuestion, quizLength, submitAnswer, timeLeft, questionInputDisabled, leaveRoom, isQcmEnabled, enableQcm}) => {
    useEffect(() => {
        app.showQuitCross(true, leaveRoom);

        return () => {
            app.showQuitCross(false);
        };
    }, []);

    return (
        <div className="question-screen-container">
            <QuestionDesktopHeader question={currentQuestion} />
            <div className="question-screen-main-data-container">
                <div className="question-screen-left">
                    <div className="question-screen-clock-container">
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
