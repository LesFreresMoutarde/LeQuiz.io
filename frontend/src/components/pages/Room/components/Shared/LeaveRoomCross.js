import React from "react";

const LeaveRoomCross = ({leaveRoom}) => {
    return (
        <button onClick={() => leaveRoom()} className="cross-button">
            <svg x="0px" y="0px" fill="#DE2D48" height="45px" width="45px" viewBox="0 0 49.01 49.01"><path d="M37.94,23.66,48,13.6a3.46,3.46,0,0,0,0-4.88L40.29,
            1A3.46,3.46,0,0,0,35.4,1l-10,10.05a1.19,1.19,0,0,1-1.69,0L13.6,1A3.45,3.45,0,0,0,8.72,1L1,8.72A3.45,3.45,0,
            0,0,1,13.6L11.06,23.66a1.19,1.19,0,0,1,0,1.69L1,35.4a3.46,3.46,0,0,0,0,4.89L8.72,48a3.46,3.46,0,0,0,4.88,
            0L23.66,37.94a1.21,1.21,0,0,1,1.69,0L35.4,48a3.48,3.48,0,0,0,4.89,0L48,40.29a3.48,3.48,0,0,0,
            0-4.89l-10.06-10A1.21,1.21,0,0,1,37.94,23.66Z"/>
            </svg>
        </button>
    )
};

export default LeaveRoomCross;
