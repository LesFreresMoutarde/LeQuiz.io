import React from "react";
import LeaveRoomCross from "../components/Shared/LeaveRoomCross";
import Clock from "../components/Shared/Clock";
import PlayerScore from "../components/Answer/PlayerScore";

class Answer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { currentQuestion, currentPlayer, game, timeLeft, leaveRoom } = this.props;
        const { scores, round, quizLength} = game;

        let goodAnswer = null;

        currentQuestion.answer.answers.map((answer) => {
            if (answer['is_good_answer']) goodAnswer = answer.content;
        });

        let header = {text: 'Mauvaise réponse', colorClass: 'text-red'};

        scores.forEach(scoreLine => {
           if (scoreLine.player.socketId === currentPlayer.socketId && scoreLine.lastAnswer)
               header = {text:'Bonne réponse', colorClass: 'text-green'}
        });

        // console.log('tableauxSCORES', scores);

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
                        <p className="good-answer">{goodAnswer}</p>

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
