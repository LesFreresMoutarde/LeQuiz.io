import React from "react";


const PickAll = ({pickAll, disabled}) => {
    return (
        <button className="pick-all-categories-button" onClick={() => pickAll()} disabled={disabled}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20"
                 viewBox="0 0 515.556 515.556" width="20" fill="white">
                <path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"/>
            </svg>
        </button>
    );
};

export default PickAll;
