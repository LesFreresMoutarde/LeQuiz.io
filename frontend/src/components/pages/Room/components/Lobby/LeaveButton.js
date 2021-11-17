import React from "react";

const LeaveButton = ({className, disabled, onClick, content}) => {
    return (
        <button className={`leave-button ${className}`}
                disabled={disabled}
                onClick={() => onClick()}
        >
            {content}
        </button>
    );
};

export default LeaveButton;
