import React from "react";
import Title from "../../misc/Title";
import BackArrow, {ON_CLICK_GO_BACK} from "../../misc/BackArrow";

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

    goToRoom = () => {
        if (this.state.valueInput != '') {
            this.props.history.push(`/room/${this.state.valueInput}`);
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
                    <BackArrow onClick={ON_CLICK_GO_BACK}/>
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
