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
      
        let user = Util.getJwtPayloadContent(Util.accessToken).user;

        if(!user) {
            user = {plan: 'free'};
        }

        const response = await Util.sendJsonToAPI('game/modes', {plan: user.plan});

        if (!response.ok) throw `${response.status} : ${response.statusText}`;

        const responseData = await response.json();

        return responseData.gameModes;
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
            return (
                    <>
                        <Title title={ChooseGameMode.TITLE}/>
                        <div className="flex-container-space-evenly">
                            {gameModes.map((gameMode, index) => {
                                return <GameMode gameMode={gameMode} key={index} pickGameMode={this.pickGameMode}/>
                            })}
                        </div>
                    </>
            )
        }
    }
}