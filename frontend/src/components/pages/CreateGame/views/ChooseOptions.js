import React from "react";
import Title from "../../../misc/Title";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Loader from "../../../misc/Loader";
import WinCriterion from "../components/WinCriterion";

import NextButton from "../../../misc/NextButton";
import QuestionTypes from "../components/QuestionTypes";


export default class ChooseOptions extends React.Component {

    static TITLE = 'Options de jeu';

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            gameOptions: false,
            winCriterionMaxValue: 0
        }
    }

    componentDidMount() {
        (async () => {
            try {
                const checkConfiguration = GameUtil.checkGameConfiguration(this.props.history);
                
                if (!checkConfiguration.verified) {
                    this.props.history.replace(checkConfiguration.redirect);

                } else {
                    const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                    console.log(gameConfiguration);

                    const categoriesId = gameConfiguration.categories.map((category) => (category.id));
                    const gameMode = gameConfiguration.gameMode.classname;

                    const response = await Util.sendJsonToAPI('/game/options', {gameMode: gameMode, categories: categoriesId});

                    if (!response.ok) throw new Error(`${response.status} : ${response.statusText}`);

                    const responseData = await response.json();

                    this.setState({
                        isLoading: false,
                        gameOptions: responseData.gameOptions
                    });


                }

            } catch (error) {
                console.error(error);
            }
        })();
    }


    evaluateWinCriterionMaxValue = (event) => {
        const questionTypes = this.state.gameOptions.questionTypes;
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);

        try {

            const checkBoxes = Array.from(document.querySelectorAll('input[id*="cbx-"'));

            const winCriterionMaxValue = GameUtil.getWinCriterionMaxValue
            (
                gameConfiguration.gameMode.classname,
                questionTypes,
                checkBoxes
            );

            this.setState({winCriterionMaxValue});
        } catch (e) {

        }



    };

    render() {
        if (this.state.isLoading) {
            return (
                <>
                    <Title title={ChooseOptions.TITLE}/>
                    <div className="app loading">
                        <div className="app-loader">
                            <Loader width="max(6vw, 80px)"/>
                        </div>
                    </div>
                </>
            );
        } else {
            const { gameOptions, winCriterionMaxValue } = this.state;
            console.log('gameOptions', gameOptions);
            return (
                <>
                    <Title title={ChooseOptions.TITLE}/>
                    <div className="game-options-container">
                        <WinCriterion winCriterion={gameOptions.winCriterion} winCriterionMaxValue={winCriterionMaxValue}/>
                        <QuestionTypes questionTypes={gameOptions.questionTypes}
                                       evaluateWinCriterionMaxValue={this.evaluateWinCriterionMaxValue}/>
                    </div>
                    <NextButton sizeClass="large-button" content="Suivant"/>
                </>
            )
        }
    }


}