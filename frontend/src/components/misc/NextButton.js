import React from "react";

const NextButton = ({sizeClass, disabled, onClick, content}) => {
    return (
        <button className={`float-right green-bg text-white ${sizeClass}`}
                disabled={disabled}
                onClick={() => onClick()}>{content}</button>
    )
};

export default NextButton;