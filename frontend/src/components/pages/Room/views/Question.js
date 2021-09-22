import React from "react";
import ClassicQuestion from "../components/Question/ClassicQuestion";
import QcmPick from "../components/Question/QcmPick";
import LeaveRoomCross from "../components/Shared/LeaveRoomCross";
import Util from "../../../../util/Util";
import Clock from "../components/Shared/Clock";
import InputValue from "../components/Question/InputValue";
import '../../../../css/pages/question.css';

const Question = ({currentQuestion, submitAnswer, timeLeft, questionInputDisabled, leaveRoom, isQcmEnabled, enableQcm}) => {
    console.log("currentQuest", currentQuestion);
    return (
        <div className="question-screen-container">
            <div className="question-screen-desktop-header">
                Catégorie
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
                                                     submitAnswer={submitAnswer}
                                                     userCanSubmit={questionInputDisabled}
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
                Croix pour quitter
            </div>
        </div>
    );
}


// class Question extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.qcmAnswersColors = Util.getRandomColors(4);
//     }
//
//     render() {
//         const {content, type, round, category, answer, typeLabel} = this.props.currentQuestion;
//         const { submitAnswer, timeLeft, questionInputDisabled, leaveRoom, isQcmEnabled, enableQcm } = this.props;
//
//         switch (type) {
//             case 'classic':
//             default:
//                 return (
//                     isQcmEnabled
//                     ?
//                         <div className="question-screen-container">
//
//                             <div className="question-screen-left">
//                                 <Clock timeLeft={timeLeft}/>
//                                 <LeaveRoomCross leaveRoom={leaveRoom}/>
//                             </div>
//
//                             <div className="question-screen-center">
//                                 <p className="question-round">{`Question ${round}`}</p>
//                                 <p className="question-content mb3">{content}</p>
//                                 <div className="qcm-container">
//                                     {answer.answers.qcm.map((answer, index) => (
//                                         <QcmPick key={index}
//                                                  colorClass={this.qcmAnswersColors[index]}
//                                                  answer={answer}
//                                                  disabled={questionInputDisabled}
//                                                  submitAnswer={submitAnswer}/>
//                                         )
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="question-screen-right">
//                                 <div className="question-header-info">
//                                     <p className={`question-header-info-box ${this.qcmAnswersColors[0]}`}>{category}</p>
//                                     <p className={`question-header-info-box ${this.qcmAnswersColors[1]}`}>{typeLabel}</p>
//                                 </div>
//                             </div>
//                         </div>
//
//                     :
//
//                         <div className="question-screen-container">
//
//                             <div className="question-screen-left">
//                                 <Clock timeLeft={timeLeft}/>
//                                 <LeaveRoomCross leaveRoom={leaveRoom}/>
//                             </div>
//
//                             <div className="question-screen-center">
//                                 <p className="question-round">{`Question ${round}`}</p>
//                                 <p className="question-content mb3">{content}</p>
//                                 <div>
//                                     <InputValue submitAnswer={submitAnswer}/>
//                                 </div>
//                             </div>
//                             <button onClick={enableQcm}>Activer QCM</button>
//                             <div className="question-screen-right">
//                                 <div className="question-header-info">
//                                     <p className={`question-header-info-box ${this.qcmAnswersColors[0]}`}>{category}</p>
//                                     <p className={`question-header-info-box ${this.qcmAnswersColors[1]}`}>{typeLabel}</p>
//                                 </div>
//                             </div>
//                         </div>
//                 );
//         }
//     }
//
//
// }

export default Question;
