import React from "react";
import {Link} from "react-router-dom";
import Title from "../../../components/misc/Title"

class Home extends React.Component {

    static TITLE = 'LE QUIZ';

    createRoom = () => {
        this.props.history.push('/create-room');
    };

    joinRoom = () => {
        this.props.history.push('/join-room');
    };

    render = () => {
        return (
            <>
                <Title title={Home.TITLE}/>
                <div className="home-menu">
                    <button className="homepage-button create-room-button" onClick={this.createRoom}>
                        <p className="homepage-button-label">Créer un salon</p>
                    </button>
                    <button className="homepage-button join-room-button" onClick={this.joinRoom}>
                        <p className="homepage-button-label">Rejoindre un salon</p>
                    </button>
                </div>
            </>

        );
    }
}

export default Home;
