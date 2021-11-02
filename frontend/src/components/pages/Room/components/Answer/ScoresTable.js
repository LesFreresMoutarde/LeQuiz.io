import React from "react";
import ScoresTableLine from "./ScoresTableLine";

const ScoresTable = ({scores, currentPlayer}) => {
    return (
        <div className="question-scores-table">
                {scores.map((scoreLineData, index) => (
                    <ScoresTableLine key={index} scoreLineData={scoreLineData} currentPlayer={currentPlayer}/>
                ))}
        </div>
    )
}

export default ScoresTable;
