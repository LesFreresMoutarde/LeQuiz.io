import React from "react";
import {Link} from "react-router-dom";

class JoinRoom extends React.Component {
    render = () => {
        return (
            <>
                <Link to="/">Back home</Link>
                <div>Join room</div>
            </>
        );
    }
}

export default JoinRoom;