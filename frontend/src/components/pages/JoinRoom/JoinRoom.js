import React from "react";
import {Link} from "react-router-dom";
import Title from "../../misc/Title";
import BackArrow from "../../misc/BackArrow";
import {placeholder} from "@babel/types";

class JoinRoom extends React.Component {

    static TITLE = 'LE QUIZ';

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render = () => {
        return (
            <>
            <Title title={JoinRoom.TITLE}/>
            <BackArrow onClick={this.goBack}/>
            <div className="join-room-div">
                <input type="text" id="join-room-input" placeholder="Code de la partie"/>
            <br/>
                <button className="join-room-enter">Entrer</button>
            </div>
            </>
        );
    }
}

export default JoinRoom;
