import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component {
    render = () => {
        return (
            <>
                <div className="label-title">LE QUIZ
                </div>
                <div className="home-menu">
                    <div className="home-menu-wrapper">
                        <button className="btn-create-room btn-menu" onClick={() => document.location.href = "/create-room"}>
                            <p className="home-menu-label">Créer un Salon</p>
                        </button>
                    </div>
                    <div className="home-menu-wrapper">
                        <button className="btn-join-room btn-menu" onClick={() => document.location.href = "/join-room"}>
                            <p className="home-menu-label">Rejoindre un salon</p>
                        </button>
                    </div>
                </div>
            </>

        );
    }
}

export default Home;
