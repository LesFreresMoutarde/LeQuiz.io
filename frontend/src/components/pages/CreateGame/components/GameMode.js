import React from "react";

const GameMode = ({gameMode, pickGameMode}) => {
   const {label, description, allowed} = gameMode;
   //console.log(pickGameMode);
    return (
        <button className="game-mode" onClick={() => pickGameMode(gameMode)} disabled={!allowed}>
            <p className="game-mode-label">{label}</p>
            <p className="game-mode-description">{description}</p>
        </button>
    );
}

export default GameMode;