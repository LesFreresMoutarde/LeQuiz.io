import React from "react";

const ScoresTableLine = ({scoreLineData, isCurrentPlayer}) => {
    return (
        <div className={`question-scores-table-item-container ${isCurrentPlayer ? 'current-player' : ''}`}>
            <div className="question-scores-table-item-rank-container">
                <div className="question-scores-table-item-rank">
                    {scoreLineData.rank}
                </div>
            </div>
            <div className="question-scores-table-item-line">
                <div className="question-scores-table-item-line-player-username">
                    <span>
                        {scoreLineData.player.username}
                    </span>
                    {true &&
                        <span className="question-scores-table-item-line-player-host-crown">
                            <img src="/img/icons/host.svg" alt="Host"/>
                        </span>
                    }

                </div>
                <div className="question-scores-table-item-line-player-score">
                    {scoreLineData.value}
                </div>
            </div>
        </div>
    )
};

export default ScoresTableLine;
