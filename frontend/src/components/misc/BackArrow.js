import React from "react";
import {useHistory} from "react-router-dom"

export const ON_CLICK_GO_BACK = 'goBack';

const BackArrow = ({onClick}) => {
    const history = useHistory();

    const _onClick = () => {
        if (typeof onClick === 'function') {
            return onClick();
        }

        if (onClick === ON_CLICK_GO_BACK) {
            history.goBack();
            return;
        }

        console.error('Unknown action', onClick)
        throw new Error('Unknown action to perform');
    }

    return (
        <button onClick={() => _onClick()} className="back-arrow-button">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="42" width="65"
                 viewBox="0 18 124 88" fill="white" xmlSpace="preserve">
                <path d="M2.3,66.3L41,97.1c4,3.1,10,0.3,10-4.8V82c0-3.3,2.2-6.2,5.5-6.2H118c3.3,0,6-2.4,6-5.8V53.8c0-3.2-2.7-6-6-6H56.5
                c-3.3,0-5.5-2.6-5.5-5.9V31.6c0-5-6-7.8-9.9-4.7l-38.6,30C-0.7,59.2-0.8,63.9,2.3,66.3z"/>
            </svg>
        </button>
    )
};

export default BackArrow;
