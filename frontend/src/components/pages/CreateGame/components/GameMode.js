import React from "react";

const GameMode = ({gameMode, pickGameMode}) => {
    const {label, description, allowed, classname} = gameMode;
    return (
        <button className={`game-mode gm-${classname.toLowerCase()}`} onClick={() => pickGameMode(gameMode)} disabled={!allowed}>
            <p className="game-mode-label">{label}</p>
            <p className="game-mode-description">{description}</p>
        </button>
    );
};

export default GameMode;
