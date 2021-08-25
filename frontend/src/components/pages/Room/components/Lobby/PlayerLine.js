import React from "react";

const PlayerLine = ({player, isCurrentPlayer}) => {
    return (
      <div className={`lobby-player-line-wrapper ${isCurrentPlayer ? 'current-player' : ''}`}>
          <span className="lobby-player-line-name">{player.username}</span>
      </div>
    );
};

export default PlayerLine;
