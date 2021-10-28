import React from "react";
import QuestionDesktopHeader from "../components/Shared/QuestionDesktopHeader";
import Clock from "../components/Shared/Clock";
import QuitCross from "../../../misc/QuitCross";
import QuestionContent from "../components/Question/QuestionContent";

const Answer = ({currentQuestion, playerAnswer, quizLength, timeLeft, leaveRoom}) => {

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
                    {/*TODO switch regarding currentQuestion.type */}
                    <div className="question-scores-container">
                        <div className="question-content-container">
                            <QuestionContent content={currentQuestion.content} />
                            <div className="question-counter">
                                Question {currentQuestion.round} sur {quizLength}
                            </div>
                        </div>
                        <div className="classic-question-good-answer">
                            {currentQuestion.answer.answers.qcm.find(answer => answer['is_good_answer']).content}
                        </div>
                        <div className="classic-question-player-answer">
                            Vous avez répondu&nbsp;:&nbsp;
                            <span className={playerAnswer.wasCorrect ? 'player-good-answer' : 'player-wrong-answer'}>
                                {playerAnswer.answer}
                            </span>
                        </div>
                        <section className="question-scores-table-section">
                            <div className="question-scores-table-title">
                                <h2>Scores</h2>
                            </div>
                            <div className="question-scores-table-container">
                                <div className="question-scores-table">
                                    <div className="question-scores-table-item-container">

                                    </div>
                                    <div className="question-scores-table-item-container">

                                    </div>
                                    <div className="question-scores-table-item-container">

                                    </div>
                                    <div className="question-scores-table-item-container">

                                    </div>
                                    <div className="question-scores-table-item-container">

                                    </div>
                                    <div className="question-scores-table-item-container">

                                    </div>
                                    <div className="question-scores-table-item-container">

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="question-screen-right"/>
            </div>
            <div className="question-screen-desktop-footer">
                <QuitCross onClick={leaveRoom} />
            </div>
        </div>
    )
}

// class Answer extends React.Component {
//
//     constructor(props) {
//         super(props);
//     }
//
//     generateHeader = (scores, currentPlayer) => {
//         if (this.hasPlayerGoodAnswer(scores, currentPlayer)) {
//             return {text:'Bonne réponse', colorClass: 'text-green'};
//         }
//
//         return {text: 'Mauvaise réponse', colorClass: 'text-red'};
//     }
//
//     hasPlayerGoodAnswer = (scores, currentPlayer) => {
//         return scores.findIndex(playerScoreLine => this.checkPlayerScoreLine(playerScoreLine, currentPlayer)) >= 0
//     }
//
//     checkPlayerScoreLine = (playerScoreLine, currentPlayer) => {
//         return playerScoreLine.player.socketId === currentPlayer.socketId && playerScoreLine.lastAnswer;
//     }
//
//     render() {
//         const { currentQuestion, currentPlayer, roomData, timeLeft, leaveRoom } = this.props;
//         const { scores, round, quizLength} = roomData;
//
//         // We display the right QCM answer as preferred one for the round.
//         const goodAnswer = currentQuestion.answer.answers.qcm.find(answer => answer['is_good_answer']).content
//
//         const header = this.generateHeader(scores, currentPlayer)
//
//         const roundInfo = round === quizLength ? 'Partie terminée' : `Question ${round} sur ${quizLength}`;
//
//         //TODO V2 ADD MEDIA DISPLAYING
//         return (
//             <div className="answer-container">
//
//                 <div className="answer-screen-left">
//                     <Clock timeLeft={timeLeft}/>
//                     {/*<LeaveRoomCross leaveRoom={leaveRoom}/>*/}
//                 </div>
//
//                 <div className="answer-screen-right">
//
//                 <div className="answer-info">
//                         <p className={`answer-result ${header.colorClass}`}>{header.text}</p>
//                         <p className="answer-round">{roundInfo}</p>
//                     </div>
//
//                     <div className="answer-content-container">
//                         <p className="good-answer">{goodAnswer}</p>
//                         <div className="scores-container">
//                             {scores.map((scoreLine, index) => (
//                                 <PlayerScore key={index} scoreLine={scoreLine} currentPlayer={currentPlayer}/>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//
// }

export default Answer
