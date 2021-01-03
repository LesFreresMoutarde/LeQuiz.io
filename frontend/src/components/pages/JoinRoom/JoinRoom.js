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
            isLoading: true,
            valueInput: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.goToRoom = this.goToRoom.bind(this);
    }

    handleChange(event) {
        this.setState({valueInput: event.target.value});
    }

    goBack = () => {
        this.props.history.goBack();
    };

    goToRoom = () => {
        //alert(this.state.valueInput)
        this.props.history.push('/room/'+ this.state.valueInput)
    }

    render = () => {
        return (
            <>
            <Title title={JoinRoom.TITLE}/>
            <BackArrow onClick={this.goBack}/>
            <div className="join-room-div">
                <label for="join-room-input" className="join-room-label">Entrez le code de la partie</label>
                <input type="text" id="join-room-input" value={this.state.valueInput} onChange={this.handleChange}/>
                <br/>
                <button className="join-room-enter" onClick={this.goToRoom}>Entrer</button>
            </div>
            </>
        );
    }
}

export default JoinRoom;
