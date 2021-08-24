import React from "react";

const PlayerLine = ({player}) => {
    return (
      <div className="lobby-player-line-wrapper">
          <span className="lobby-player-line-name">{player.username}</span>
      </div>
    );
};

export default PlayerLine;
