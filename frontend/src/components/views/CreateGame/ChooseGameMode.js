import React from "react";
import {Link} from "react-router-dom";
import Util from "../../../util/Util";


export default class ChooseGameMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameConfiguration: Util.getObjectFromLocalStorage('gameConfiguration')
        };
    }

    componentDidMount() {
        console.log('la config de la game', this.state.gameConfiguration);
        (async () => {
            await this.getGameModes()
        })();
    }

    getGameModes = async () => {
        // TODO Get This Logical with Role
        try {
            const userRole = Util.getJwtPayloadContent(Util.accessToken).userRole;
            const response = await fetch(Util.getBackendFullUrl('/game/modes'), {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({role: userRole})
            });

            if (!response.ok) throw `${response.status} : ${response.statusText}`;

            const allowedGameModes = await response.json();
            console.log(allowedGameModes)


        } catch (error) {
            console.log(error);
            throw error;
        }
        // userRole key name could be changed in final implementation

        //const gameModes = fetch()
    }

    render() {
        return (
            <>
                <p>Le mode de jeu</p>
                <Link to="/create-room/choose-categories">GoTo Categories</Link>
            </>
        )
    }
}