import React from "react";

const LeaveButton = ({leaveRoom}) => {

    return (
        <button className="large-button leave-button" onClick={() => leaveRoom()}>Quitter</button>
    )
};

export default LeaveButton;
