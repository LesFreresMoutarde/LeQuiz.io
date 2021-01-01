import React from "react";
import {Link} from "react-router-dom";
import Title from "../../../components/misc/Title"

class Home extends React.Component {

    static TITLE = 'LE QUIZ';

    createRoom = () => {
        this.props.history.replace('/create-room');
    };

    joinRoom = () => {
        this.props.history.replace('/join-room');
    };

    render = () => {
        return (
            <>
                <Title title={Home.TITLE}/>
                <div className="home-menu">
                    <div className="home-menu-wrapper">
                        <button className="home-menu-create home-menu-btn" onClick={this.createRoom}>
                            <p className="home-menu-btn-label">Créer un Salon</p>
                        </button>
                    </div>
                    <div className="home-menu-wrapper">
                        <button className="home-menu-join home-menu-btn" onClick={this.joinRoom}>
                            <p className="home-menu-btn-label">Rejoindre un salon</p>
                        </button>
                    </div>
                </div>
            </>

        );
    }
}

export default Home;
