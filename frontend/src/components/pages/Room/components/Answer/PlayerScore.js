import React from "react";

const PlayerScore = ({scoreLine, currentPlayer}) =>{

    const colorClass = scoreLine.player.socketId === currentPlayer.socketId ? 'outrageous-orange-bg' : 'malibu-blue-bg'

    return (
        <div className="player-score-container">
            <div className={`player-box player-rank-box ${colorClass}`}>
                <p className="player-rank">{scoreLine.rank}</p>
            </div>
            <div className={`player-box player-score-info player-score-info-container ${colorClass}`}>
                <p className="player-username">{scoreLine.player.username}</p>
                <p className="player-score">{scoreLine.value}</p>
            </div>
        </div>
    )
};

export default PlayerScore;
