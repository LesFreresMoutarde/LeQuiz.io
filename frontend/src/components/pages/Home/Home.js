import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component {
    render = () => {
        return (
            <>
                <ul>
                    <li><Link to="/create-room/game-mode">Create room</Link></li>
                    <li><Link to="/join-room">Join room</Link></li>
                </ul>
            </>
        );
    }
}

export default Home;