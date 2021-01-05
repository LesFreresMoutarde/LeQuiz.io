import React from "react";
import Title from "../../misc/Title";
import BackArrow from "../../misc/BackArrow";

class JoinRoom extends React.Component {

    static TITLE = 'Rejoindre une partie';

    constructor(props) {
        super(props);
        this.state = {
            valueInput: ''
        };
    }

    handleChange = (event) => {
        this.setState({valueInput: event.target.value});
    }

    goBack = () => {
        this.props.history.goBack();
    };

    goToRoom = () => {
        if (this.state.valueInput != '') {
            this.props.history.push('/room/' + this.state.valueInput)
        }
    };

    handleEnterKey = (event) => {
        if(event.key === 'Enter'){
            this.goToRoom();
        }
    };

    render = () => {
        return (
            <>
                <div className="create-game-header">
                    <BackArrow onClick={this.goBack}/>
                    <Title title={JoinRoom.TITLE}/>
                </div>
            <div className="join-room-div">
                <label htmlFor="join-room-input" className="join-room-label">Entrez le code de la partie</label>
                <input type="text" id="join-room-input" value={this.state.valueInput} onChange={this.handleChange} onKeyPress={this.handleEnterKey}/>
                <button className="join-room-enter" onClick={this.goToRoom}>Entrer</button>
            </div>
            </>
        );
    }
}

export default JoinRoom;
