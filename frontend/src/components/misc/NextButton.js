import React from "react";

const NextButton = ({sizeClass, disabled, onClick, content}) => {
    return (
        <button className={`float-right next-button ${sizeClass}`}
                disabled={disabled}
                onClick={() => onClick()}>{content}</button>
    )
};

export default NextButton;