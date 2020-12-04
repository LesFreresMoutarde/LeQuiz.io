import React from "react";

const NextButton = ({sizeClass, disabled, submitCategories, content}) => {
    return (
        <button className={`float-right green-bg text-white ${sizeClass}`}
                disabled={disabled}
                onClick={() => submitCategories()}>{content}</button>
    )
};

export default NextButton;