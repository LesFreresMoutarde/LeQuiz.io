import React from "react";
import Title from "../../../misc/Title";

class Answer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { currentQuestion, currentPlayer, scores} = this.props;
        console.log("currPlayer", currentPlayer);
        let header = {text: 'Mauvaise réponse', colorClass: 'text-red'};

        scores.forEach(lineScore => {
           if (lineScore.player.socketId === currentPlayer.socketId && lineScore.lastAnswer)
               header = {text:'Bonne réponse', colorClass: 'text-green'}
        });
        // const header = scores[currentPlayer.socketId].lastAnswer
        //     ?
        //     {text:'Bonne réponse', colorClass: 'text-green'}
        //     :
        //     {text:'Mauvaise réponse', colorClass: 'text-red'};

        return (
            <>
                <Title title={header.text} colorClass={header.colorClass}/>
                <p>Scores</p>
                <ul>
                    {scores.map(lineScore => (
                        <p>{lineScore.rank} | {lineScore.player.username} | {lineScore.value}</p>
                    ))}
                </ul>
            </>
        )
    }

}

export default Answer