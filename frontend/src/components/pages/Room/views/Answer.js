import React from "react";
import Title from "../../../misc/Title";
import LeaveRoomCross from "../components/Shared/LeaveRoomCross";
import AnswerHeader from "../components/Answer/AnswerHeader";

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

        scores.forEach(lineScore => {
           if (lineScore.player.socketId === currentPlayer.socketId && lineScore.lastAnswer)
               header = {text:'Bonne réponse', colorClass: 'text-green'}
        });

        let roundInfo = `Question ${round} sur ${quizLength}`;

        if (round === quizLength) roundInfo = 'Partie terminée';

        //TODO V2 ADD MEDIA DISPLAYING
        return (
            <>
                <AnswerHeader header={header} timeLeft={timeLeft} roundInfo={roundInfo}/>
                <div className="answer-container">
                    <p className="good-answer">{goodAnswer}</p>
                    <p>Scores</p>
                    <ul>
                        {scores.map((lineScore, index) => (
                            <p key={index}>{lineScore.rank} | {lineScore.player.username} | {lineScore.value}</p>
                        ))}
                    </ul>
                </div>

            </>
        )
    }

}

export default Answer
