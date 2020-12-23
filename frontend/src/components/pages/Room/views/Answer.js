import React from "react";
import Title from "../../../misc/Title";
import LeaveRoomCross from "../components/Shared/LeaveRoomCross";

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

        let roundInformation = `Question ${round} sur ${quizLength}`;

        if (round === quizLength) roundInformation = 'Partie terminée';


        return (
            <>
                <LeaveRoomCross leaveRoom={leaveRoom}/>
                <Title title={header.text} colorClass={header.colorClass}/>
                <p>Temps restant : {timeLeft}</p>
                <p>{roundInformation}</p>
                <p>{currentQuestion.content}</p>
                <p><strong>{goodAnswer}</strong></p>
                <p>Scores</p>
                <ul>
                    {scores.map((lineScore, index) => (
                        <p key={index}>{lineScore.rank} | {lineScore.player.username} | {lineScore.value}</p>
                    ))}
                </ul>
            </>
        )
    }

}

export default Answer
