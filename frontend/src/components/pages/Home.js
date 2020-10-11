import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component {
    render = () => {
        return (
            <>
                Home page
                <ul>
                    <li><Link to="/create-room">Create room</Link></li>
                    <li><Link to="/join-room">Join room</Link></li>
                </ul>
            </>
        );
    }
}

export default Home;