import React from "react";
import {Link} from "react-router-dom";
import Util from "../../../../util/Util";
import Loader from "../../../misc/Loader";
import GameMode from "../components/GameMode";


export default class ChooseGameMode extends React.Component {

    static TITLE = 'Choisissez un mode de jeu';

    constructor(props) {
        super(props);
        this.state = {
            gameConfiguration: Util.getObjectFromSessionStorage('gameConfiguration'),
            gamesModes: false,
            isLoading: true
        };
    }

    componentDidMount() {
        (async () => {
           /* console.log("IS LOADING BEFORE", this.state.isLoading)
            console.log('la config de la game', this.state.gameConfiguration);*/
            let gameModes = await this.getGameModes();
            this.setState({
                gameModes,
                isLoading: false
            });
           /* console.log("IS LOADING AFTER", this.state.isLoading);
            console.log("gameModes STATE", this.state.gameModes);
            console.log("gameConfig STATE", this.state.gameConfiguration);*/
        })();
    }

    getGameModes = async () => {
        // TODO Get This Logical with Role
        try {
            const userPlan = Util.getJwtPayloadContent(Util.accessToken).user.plan;
            const response = await fetch(Util.getBackendFullUrl('/game/modes'), {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({plan: userPlan})
            });

            if (!response.ok) throw `${response.status} : ${response.statusText}`;

            const responseData = await response.json();

            return responseData.gameModes;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    pickGameMode = (gameMode) => {
        console.log("toto")
        console.log('le mode choisi', gameMode)
        const gameConfiguration = Util.getObjectFromSessionStorage('gameConfiguration');
        gameConfiguration.gameMode = gameMode;
        console.log(gameConfiguration)
        window.location = '/join-room'
    }

    render() {
        if (this.state.isLoading) {
            return (
                <>
                    <h1>{ChooseGameMode.TITLE}</h1>
                    <div className="app loading">
                        <div className="app-loader">
                            <Loader width="max(6vw, 80px)"/>
                        </div>
                    </div>
                </>
            );
        } else {
            const gameModes = this.state.gameModes;
            console.log(gameModes);
            return (
                <>
                    <h1>{ChooseGameMode.TITLE}</h1>
                    <div>
                    {gameModes.map((gameMode, index) => {
                       // console.log(gameMode);
                        return <GameMode gameMode={gameMode} key={index} pickGameMode={this.pickGameMode}/>
                    })}
                    </div>
                    <Link to="/create-room/choose-categories">GoTo Categories</Link>
                </>
            )
        }
    }
}