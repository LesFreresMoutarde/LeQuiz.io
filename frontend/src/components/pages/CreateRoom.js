import React from "react";
import {Link} from "react-router-dom";

class CreateRoom extends React.Component {
    render = () => {
        return (
            <>
                <Link to="/">Back home</Link>
                <div>Create room</div>
            </>
        );
    }
}

export default CreateRoom;