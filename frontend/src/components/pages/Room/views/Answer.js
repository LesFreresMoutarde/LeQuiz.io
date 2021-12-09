import React, {useEffect} from "react";
import QuestionDesktopHeader from "../components/Shared/QuestionDesktopHeader";
import Clock from "../components/Shared/Clock";
import QuitCross from "../../../misc/QuitCross";
import QuestionContent from "../components/Question/QuestionContent";
import ScoresTable from "../components/Answer/ScoresTable";
import {app} from "../../../App";

const Answer = ({roomData, currentPlayer, currentQuestion, playerAnswer, quizLength, timeLeft, leaveRoom}) => {
    useEffect(() => {
        app.showQuitCross(true, leaveRoom);

        return () => {
            app.showQuitCross(false);
        };
    }, []);

    const displayQuestionCounter = () => {
            return currentQuestion.round === quizLength
                ? 'Partie terminée'
                : `Question ${currentQuestion.round} sur ${quizLength}`;
    }

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
                                {displayQuestionCounter()}
                            </div>
                        </div>
                        <div className="classic-question-good-answer">
                            {currentQuestion.answer.answers.qcm.find(answer => answer['is_good_answer']).content}
                        </div>
                        <div className="classic-question-player-answer">
                            {playerAnswer.answer !== null ?
                                <span>
                                    Vous avez répondu&nbsp;:&nbsp;
                                    <span className={playerAnswer.wasCorrect ? 'player-good-answer' : 'player-wrong-answer'}>
                                        {playerAnswer.answer}
                                    </span>
                                </span>
                                :
                                <>
                                    Vous n'avez pas répondu
                                </>
                            }
                        </div>
                        <section className="question-scores-table-section">
                            <div className="question-scores-table-title">
                                <h2>Scores</h2>
                            </div>
                            <div className="question-scores-table-container">
                                <ScoresTable scores={roomData.scores} currentPlayer={currentPlayer} hostPlayer={roomData.host} />
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
