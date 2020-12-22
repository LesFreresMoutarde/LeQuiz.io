import React from "react";

const BackArrow = ({onClick}) => {
        return (
            <button onClick={() => onClick()}>Précédent</button>
        )
};

export default BackArrow;
