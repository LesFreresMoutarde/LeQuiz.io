import React from "react";
import {Link} from "react-router-dom";

const GameModeBox = ({gameMode}) => {
    return (
        <>
            <p>Mode de jeu : {gameMode.label}</p>
        </>
    )
};

export default GameModeBox;