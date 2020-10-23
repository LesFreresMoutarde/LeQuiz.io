import React from "react";

const GameMode = ({gameMode, pickGameMode}) => {
   const {label, description, allowed} = gameMode;
   //console.log(pickGameMode);
    return (
        <button onClick={() => pickGameMode(gameMode)} disabled={!allowed}>
            <p>{label}</p>
            <p>{description}</p>
        </button>
    );
}

export default GameMode;