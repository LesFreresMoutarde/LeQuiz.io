import React from "react";
import Title from "../../../components/misc/Title";
import Logo from "../../misc/Logo";

class Home extends React.Component {

    createRoom = () => {
        this.props.history.push('/create-room');
    };

    joinRoom = () => {
        this.props.history.push('/join-room');
    };

    render = () => {
        return (
            <>
                <Logo height="200" width="300"/>
                <div>
                    <h1 className="home-title-description">Plateforme de quiz multijoueur en temps réel – Générez des quiz sur des thématiques variées, définissez les options de jeu et jouez avec vos amis</h1>
                </div>
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
