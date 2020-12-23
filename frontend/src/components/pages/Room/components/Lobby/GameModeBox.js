import React from "react";
import {Link} from "react-router-dom";

const GameModeBox = ({gameMode, changeOptions, displayClass}) => {
    return (
        <>
            <p>Mode de jeu : {gameMode.label}</p>
            <button className={`${displayClass}`} onClick={() => changeOptions('gameMode')}>Modifier</button>
        </>
    )
};

export default GameModeBox;
