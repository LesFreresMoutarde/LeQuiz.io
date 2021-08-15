import React from "react";

const WinCriterion = ({ winCriterion, winCriterionMaxValue, winCriterionInputValue, validateWinCriterionValue }) => {
    const { label, type} = winCriterion;
    return (
        <div className="win-criterion-wrapper game-options-main-row-block">
            <div className="game-options-main-block-title">{label}</div>
            <div className="game-options-win-criterion-input-wrapper">
                <p className="win-criterion-max">Max : {winCriterionMaxValue}</p>
                <input className="win-criterion-input"
                       onChange={(event) => validateWinCriterionValue(winCriterionMaxValue, winCriterionInputValue, event)}
                       id="criterion-value" type={type} min={0} max={winCriterionMaxValue} value={winCriterionInputValue}/>
            </div>
        </div>
    )
};

export default WinCriterion;
