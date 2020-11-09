import React from "react";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
import Util from "../../../../util/Util";
import Loader from "../../../misc/Loader";
import GameMode from "../components/GameMode";
import Title from "../../../misc/Title";


export default class ChooseGameMode extends React.Component {

    static TITLE = 'Choisissez un mode de jeu';

    constructor(props) {
        super(props);
        this.state = {
            gameConfiguration: Util.getObjectFromSessionStorage('gameConfiguration'),
            gamesModes: false,
            isLoading: true,
            redirect: false,
        };
    }

    componentDidMount() {
        (async () => {
            try {
                let gameModes = await this.getGameModes();
                this.setState({
                    gameModes,
                    isLoading: false
                });
            } catch (error) {
                console.error(error);
            }
        })();
    }

    getGameModes = async () => {
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
            throw error;
        }
    };

    pickGameMode = (gameMode) => {
        const gameConfiguration = Util.getObjectFromSessionStorage('gameConfiguration');
        gameConfiguration.gameMode = gameMode;
        Util.addObjectToSessionStorage('gameConfiguration', gameConfiguration);
        this.setState({redirect: true});
    };

    generateLayout = (gameModes) => {
        let row = 1;
        let layout = {[row]: []};
        let layoutData = [];
        gameModes.map((gameMode, index, array) => {
            layout[row].push(gameMode);
            if (index !== 0 && index % 2 !== 0) {
                row++;
                if (row <= array.length / 2)
                layout[row] = [];
            }
        });
        console.log('layout',layout);

        for (const row in layout) {
            //console.log(layout[row]);
            layoutData.push(layout[row]);
        }
        console.log(layoutData)
        return layoutData;
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
            const {gameModes, redirect} = this.state;
            const layout = this.generateLayout(gameModes);
            return (
                redirect ?
                    <Redirect to="/create-room/categories"/>
                :
                    <>
                        <Title title={ChooseGameMode.TITLE}/>
                        <div className="flex-container">
                            {gameModes.map((gameMode, index) => {
                                return <GameMode gameMode={gameMode} key={index} pickGameMode={this.pickGameMode}/>
                            })}
                        </div>
                    </>
            )
        }
    }
}