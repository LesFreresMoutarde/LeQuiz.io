import React from "react";
import LeaveRoomCross from "../components/Shared/LeaveRoomCross";
import Clock from "../components/Shared/Clock";
import PlayerScore from "../components/Answer/PlayerScore";

class Answer extends React.Component {

    constructor(props) {
        super(props);
    }

    generateHeader = (scores, currentPlayer) => {
        if (this.hasPlayerGoodAnswer(scores, currentPlayer)) {
            return {text:'Bonne réponse', colorClass: 'text-green'};
        }

        return {text: 'Mauvaise réponse', colorClass: 'text-red'};
    }

    hasPlayerGoodAnswer = (scores, currentPlayer) => {
        return scores.findIndex(playerScoreLine => this.checkPlayerScoreLine(playerScoreLine, currentPlayer)) >= 0
    }

    checkPlayerScoreLine = (playerScoreLine, currentPlayer) => {
        return playerScoreLine.player.socketId === currentPlayer.socketId && playerScoreLine.lastAnswer;
    }

    render() {
        const { currentQuestion, currentPlayer, roomData, timeLeft, leaveRoom } = this.props;
        const { scores, round, quizLength} = roomData;

        let goodAnswers = [];
        let goodAnswer = null;

        // We display the right QCM answer as preferred one for the round.
        currentQuestion.answer.answers.qcm.map((answer) => {
            if (answer['is_good_answer']) goodAnswer = answer.content;
                //goodAnswers.push(answer.content);
        });

        // let header = {text: 'Mauvaise réponse', colorClass: 'text-red'};

        const header = this.generateHeader(scores, currentPlayer)

        // if (scores.findIndex(playerScoreLine => {
        //     return playerScoreLine.player.socketId === currentPlayer.socketId && playerScoreLine.lastAnswer
        // }) >= 0) {
        //
        // }
        //
        // scores.forEach(scoreLine => {
        //    if (scoreLine.player.socketId === currentPlayer.socketId && scoreLine.lastAnswer)
        //        header = {text:'Bonne réponse', colorClass: 'text-green'}
        // });

        let roundInfo = `Question ${round} sur ${quizLength}`;

        if (round === quizLength) roundInfo = 'Partie terminée';

        //TODO V2 ADD MEDIA DISPLAYING
        return (
            <div className="answer-container">

                <div className="answer-screen-left">
                    <Clock timeLeft={timeLeft}/>
                    <LeaveRoomCross leaveRoom={leaveRoom}/>
                </div>

                <div className="answer-screen-right">

                <div className="answer-info">
                        <p className={`answer-result ${header.colorClass}`}>{header.text}</p>
                        <p className="answer-round">{roundInfo}</p>
                    </div>

                    <div className="answer-content-container">
                        {/*{goodAnswers.map((goodAnswer, index) =>*/}
                            <p /*key={index}*/ className="good-answer">{goodAnswer}</p>
                        {/*)}*/}
                        <div className="scores-container">
                            {scores.map((scoreLine, index) => (
                                <PlayerScore key={index} scoreLine={scoreLine} currentPlayer={currentPlayer}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Answer
