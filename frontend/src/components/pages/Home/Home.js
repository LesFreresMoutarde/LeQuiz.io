import React, {useEffect, useState} from "react";
import Logo from "../../misc/Logo";
import {app} from "../../App";
import '../../../css/pages/home.css';
import {Link} from "react-router-dom";
import JoinRoomButtonIcon from "../../misc/JoinRoomButtonIcon";

const Home = () => {
    const [ joinRoomCode, setJoinRoomCode ] = useState('');

    useEffect(() => {
        app.showBackArrow(false);
    }, []);

    const onJoinRoomInputChange = (e) => {
        setJoinRoomCode(e.target.value);
    }

    const onJoinRoomInputKeyUp = (e) => {
        if (e.keyCode !== 13) {
            return;
        }

        if (joinRoomCode === '') {
            return;
        }

        console.log('LETS GO')
    }

    return (
        <>
            <Logo height="200" width="300"/>
            <div className="home-menu">
                <Link to="/create-room" className="home-create-room-button">Créer un salon</Link>


                <div className="home-join-room-form">
                    <input type="text"
                           id="home-join-room-input"
                           placeholder="Rejoindre un salon"
                           onChange={onJoinRoomInputChange}
                           onKeyUp={onJoinRoomInputKeyUp}
                           value={joinRoomCode}
                    />
                    <Link to={`/room/${joinRoomCode}`} id="home-join-room-button">
                        <JoinRoomButtonIcon />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;
