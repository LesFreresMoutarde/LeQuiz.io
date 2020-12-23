import React from "react";

const LeaveButton = ({leaveRoom}) => {

    return (
        <button onClick={() => leaveRoom()}>Quitter</button>
    )
};

export default LeaveButton;
