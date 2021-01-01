import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Loader from "../../../misc/Loader";
import GameMode from "../components/GameMode";
import Title from "../../../misc/Title";
import BackArrow from "../../../misc/BackArrow";


export default class ChooseGameMode extends React.Component {

    static TITLE = 'Choisissez un mode de jeu';

    constructor(props) {
        super(props);
        this.state = {
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
       this.props.submit(gameMode);
    };

    goBack = () => {
        this.props.goBack('chooseGameMode');
    }

    render() {
        if (this.state.isLoading) {
            return (
                <>
                    <Title title={ChooseGameMode.TITLE}/>
                    <BackArrow onClick={this.goBack}/>
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
                        <BackArrow onClick={this.goBack}/>
                        <div className="game-mode-container">
                            {gameModes.map((gameMode, index) => {
                                return <GameMode gameMode={gameMode} key={index} pickGameMode={this.pickGameMode}/>
                            })}
                        </div>
                    </>
            )
        }
    }
}
