import React from "react";

const LeaveRoomCross = ({leaveRoom}) => {
    return (
        <button onClick={() => leaveRoom()}>X</button>
    )
};

export default LeaveRoomCross;
