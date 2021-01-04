import React from "react";

const PlayerLine = ({player}) => {
    return (
      <div className="player-line-wrapper">
          <p className="player-line">{player}</p>
      </div>
    );
};

export default PlayerLine;
