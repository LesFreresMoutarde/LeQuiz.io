import React from "react";

const PlayerLine = ({player, isCurrentPlayer, isHost}) => {
    return (
        <div className={`lobby-player-line-wrapper ${isCurrentPlayer ? 'current-player' : ''}`}>
            <span className="lobby-player-line-name">{player.username}</span>
            {isHost &&
                <span>
                    <img src="/img/icons/host.svg" alt="Host"/>
                </span>
            }
        </div>
    );
};

export default PlayerLine;
