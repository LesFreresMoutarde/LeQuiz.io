import React from "react";

const NextButton = ({sizeClass, disabled, submitCategories}) => {
    return (
        <button className={`float-right green-bg text-white ${sizeClass}`} disabled={disabled} onClick={() => submitCategories()}>Valider</button>
    )
};

export default NextButton;