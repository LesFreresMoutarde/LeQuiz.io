import React from "react";
import {Link} from "react-router-dom";

const GameModeBox = ({gameMode}) => {
    return (
        <>
            <p>Mode de jeu</p>
            <Link to='/create-room/game-mode'>Edit</Link>

        </>
    )
};

export default GameModeBox;