import React from "react";

const WinCriterion = ({ winCriterion, winCriterionMaxValue, winCriterionInputValue, validateWinCriterionValue }) => {
    const { label, type} = winCriterion;
    return (
        <div className="win-criterion-wrapper">
            <p className="game-options-section-header">{label}</p>
            <p className="win-criterion-max">Maximum : {winCriterionMaxValue}</p>
            <input className="win-criterion-input"
                   onChange={(event) => validateWinCriterionValue(winCriterionMaxValue, winCriterionInputValue, event)}
                   id="criterion-value" type={type} min={0} max={winCriterionMaxValue} value={winCriterionInputValue}/>
        </div>
    )
};

export default WinCriterion;
