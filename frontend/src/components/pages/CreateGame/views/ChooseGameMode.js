import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Loader from "../../../misc/Loader";
import GameMode from "../components/GameMode";
import Title from "../../../misc/Title";


export default class ChooseGameMode extends React.Component {

    static TITLE = 'Choisissez un mode de jeu';

    constructor(props) {
        super(props);
        this.state = {
            gameConfiguration: Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key),
            gamesModes: false,
            isLoading: true,
        };
    }

    componentDidMount() {
        (async () => {
            try {
                const gameModes = await this.getGameModes();

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

            const response = await Util.sendJsonToAPI('game/modes', {plan: userPlan});

            if (!response.ok) throw `${response.status} : ${response.statusText}`;

            const responseData = await response.json();

            return responseData.gameModes;
        } catch (error) {
            throw error;
        }
    };

    pickGameMode = (gameMode) => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        gameConfiguration.gameMode = gameMode;
        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

        this.props.history.push('/create-room/categories');
    };

    render() {
        if (this.state.isLoading) {
            return (
                <>
                    <Title title={ChooseGameMode.TITLE}/>
                    <div className="app loading">
                        <div className="app-loader">
                            <Loader width="max(6vw, 80px)"/>
                        </div>
                    </div>
                </>
            );
        } else {
            const { gameModes } = this.state;
            const colors = Util.getRandomColors(gameModes.length);
            return (
                    <>
                        <Title title={ChooseGameMode.TITLE}/>
                        <div className="flex-container">
                            {gameModes.map((gameMode, index) => {
                                const color = colors[index];
                                return <GameMode color={color} gameMode={gameMode} key={index} pickGameMode={this.pickGameMode}/>
                            })}
                        </div>
                    </>
            )
        }
    }
}