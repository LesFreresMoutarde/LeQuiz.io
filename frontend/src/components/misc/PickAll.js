import React from "react";


const PickAll = ({pickAll, disabled}) => {
    return (
        <button className='pick-buttons pick-all' onClick={() => pickAll()} disabled={disabled}>
            <svg version="1.1" x="0px" y="0px" height="20px" width="20px" viewBox="0 0 512 512">
                <path fill="white" d="M429.8,77.4L175.9,349.3L76,256c-4.8-4.5-12.4-4.3-17,0.6l-27.3,29.2c-4.5,4.8-4.3,12.4,0.6,17l137.9,128.8
                c4.8,4.5,12.4,4.3,17-0.6l289.4-309.9c4.5-4.8,4.3-12.4-0.6-17l-29.2-27.3C442,72.3,434.4,72.6,429.8,77.4z"/>
            </svg>
        </button>
    );
};

export default PickAll;