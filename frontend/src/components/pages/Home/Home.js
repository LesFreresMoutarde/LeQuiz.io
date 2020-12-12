import React from "react";
import {Link} from "react-router-dom";
const socketIo = require('socket.io-client');

class Home extends React.Component {

    componentDidMount() {
        const socket = socketIo('http://localhost:3000')
        console.log("la socket", socket);
    }

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