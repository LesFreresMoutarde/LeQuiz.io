import React from "react";

const WinCriterion = ({ winCriterion, winCriterionMaxValue }) => {
    const { label, type} = winCriterion
    return (
        <>
            <p className="game-options-section-header">{label}</p>
            <p>Max : {winCriterionMaxValue}</p>
            <input type={type}/>
        </>
        )
};

export default WinCriterion;
