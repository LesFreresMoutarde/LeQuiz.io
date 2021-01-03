import React from "react";

const NextButton = ({sizeClass, disabled, onClick, content, displayClass}) => {


    return (
        <button className={`float-right next-button ${sizeClass} ${displayClass}`}
                disabled={disabled}
                onClick={() => onClick()}>{content}</button>
    )
};

export default NextButton;
