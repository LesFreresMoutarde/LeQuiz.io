import React from "react";
import Loader from "../../../misc/Loader";
import GameMode from "../components/GameMode";
import Title from "../../../misc/Title";
import AuthUtil from "../../../../util/AuthUtil";
import ApiUtil from "../../../../util/ApiUtil";
import {app} from "../../../App";

export default class ChooseGameMode extends React.Component {

    static TITLE = 'Mode de jeu';

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
                app.toastr.error('Impossible d\' afficher les modes de jeu, réessayez ultérieurement');
            }
        })();
    }

    getGameModes = async () => {
      
        let user = AuthUtil.accessTokenPayload.user;

        if(!user) {
            user = {plan: 'free'};
        }

        const response = await ApiUtil.sendJsonToAPI('game/modes', {plan: user.plan});

        if (!response.ok) throw `${response.status} : ${response.statusText}`;

        const responseData = await response.json();

        return responseData.gameModes;
    };

    pickGameMode = (gameMode) => {
       this.props.submit(gameMode);
    };

    render() {
        if (this.state.isLoading) {
            return (
                <>
                    <div className="create-game-header">
                        <Title title={ChooseGameMode.TITLE}/>
                    </div>
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
                    <div className="create-game-header">
                        <Title title={ChooseGameMode.TITLE}/>
                    </div>
                    <div className="game-mode-container flex-item-full-space">
                        {gameModes.map((gameMode, index) => {
                            return <GameMode gameMode={gameMode} key={index} pickGameMode={this.pickGameMode}/>
                        })}
                    </div>
                </>
            )
        }
    }
}
