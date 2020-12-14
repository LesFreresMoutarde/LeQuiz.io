import React from "react";
import {Link} from "react-router-dom";

const OptionsBox = ({options}) => {
    return (
        <>
            <p>Options de jeu</p>
            <Link to='/create-room/options'>Edit</Link>
        </>
    )
};

export default OptionsBox;