import React from "react";

const NextButton = ({className, disabled, onClick, content}) => {
    return (
        <button className={`next-button ${className}`}
                disabled={disabled}
                onClick={() => onClick()}
        >
            {content}
        </button>
    );
};

export default NextButton;
