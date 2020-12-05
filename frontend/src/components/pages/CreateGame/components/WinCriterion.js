import React from "react";

const WinCriterion = ({ winCriterion }) => {
    const { label, type} = winCriterion
    return (
        <>
            <p className="game-options-section-header">{label}</p>
            <p>Max : </p>
            <input type={type}/>
        </>
        )
};

export default WinCriterion;
