import React from "react";

const ScoresTableLine = ({scoreLineData, currentPlayer}) =>{

    const colorClass = scoreLineData.player.socketId === currentPlayer.socketId ? 'outrageous-orange-bg' : 'malibu-blue-bg'

    return (
        <div className="question-scores-table-item-container">
            <div className={`player-box player-rank-box ${colorClass}`}>
                <p className="player-rank">{scoreLineData.rank}</p>
            </div>
            <div className={`player-box player-score-info player-score-info-container ${colorClass}`}>
                <p className="player-username">{scoreLineData.player.username}</p>
                <p>{scoreLineData.value}</p>
            </div>
        </div>
    )
};

export default ScoresTableLine;
