import React from "react";

const GameMode = ({gameMode, pickGameMode, color}) => {
   const {label, description, allowed} = gameMode;
    return (
        <div className="game-mode-wrapper">
        <button className={`game-mode ${color}`} onClick={() => pickGameMode(gameMode)} disabled={!allowed}>
            <p className="game-mode-label text-white">{label}</p>
            <p className="game-mode-description text-white">{description}</p>
        </button>
        </div>
    );
};

export default GameMode;