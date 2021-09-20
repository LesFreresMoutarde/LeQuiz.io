import React from "react";

const Clock = ({timeLeft}) => {
    const xAxisPct = (() => {
        // We never know...
        if (timeLeft >= 1000) {
            return "9%";
        }

        if (timeLeft >= 100) {
            return "21%";
        }

        if (timeLeft >= 10) {
            return "30%";
        }

        return "37%";
    })();

    const timeLeftToDisplay = timeLeft > 0  ? timeLeft : 0;

    return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 512" fill="#fff" xmlSpace="preserve">
                <path d="M437,75C388.7,26.6,324.4,0,256,0c-11,0-20,9-20,20s9,20,20,20c119.1,0,216,96.9,216,216s-96.9,216-216,216S40,375.1,40,256
                c0-11-9-20-20-20s-20,9-20,20c0,68.4,26.6,132.7,75,181s112.6,75,181,75s132.7-26.6,181-75s75-112.6,75-181S485.4,123.3,437,75z
                M183,51c11,0,20-9,20-20s-9-20-20-20s-20,9-20,20S172,51,183,51z M117,85c11,0,20-9,20-20s-9-20-20-20s-20,9-20,20S106,85,117,85z
                M65,137c11,0,20-9,20-20s-9-20-20-20s-20,9-20,20S54,137,65,137z M31,203c11,0,20-9,20-20s-9-20-20-20s-20,9-20,20S20,203,31,203z"
                />
                <text x={xAxisPct} y="62%" fontSize="10em">{timeLeftToDisplay}</text>
           </svg>
   );
};

export default Clock;
