import React from "react";
import Title from "../../../misc/Title";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Loader from "../../../misc/Loader";
import WinCriterion from "../components/WinCriterion";
import QuestionType from "../components/QuestionType";
import NextButton from "../../../misc/NextButton";
import QuestionTypes from "../components/QuestionTypes";


export default class ChooseOptions extends React.Component {

    static TITLE = 'Options de jeu';

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            gameOptions: false,
            winCriterionMaxValue: false
        }
    }

    componentDidMount() {
        (async () => {
            try {
                //TODO Vérifier la conf de la game
                const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                console.log(gameConfiguration);
                let gameMode = "Serie";
                const categoriesId = gameConfiguration.categories.map((category) => (category.id));

                /* DEBUG EN ATTENDANT DE REVERIFIER LA CONF DE LA GAME */

                // JV, Sport, Histoire
                if (categoriesId.length === 0) categoriesId.push('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',
                        "3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3",
                        "9bde0fff-731d-4fe2-939e-f737e926bd70")

                console.log("catID", categoriesId);
               /* FIN DEBUG */

                const response = await Util.sendJsonToAPI('/game/options', {gameMode: gameMode, categories: categoriesId});

                if (!response.ok) throw new Error(`${response.status} : ${response.statusText}`);

                const responseData = await response.json();

                this.setState({
                    isLoading: false,
                    gameOptions: responseData.gameOptions
                });

                //console.log(responseData);
                
            } catch (error) {
                console.error(error);
            }


        })();
    }

    // SUrement USELESS
    evaluateWinCriterionMaxValue = (event) => {
        const questionTypes = this.state.gameOptions.questionTypes;
        console.log('toto', questionTypes);
        const checkBoxes = Array.from(document.querySelectorAll('input[id*="checkbox-"'));
        checkBoxes.map(checkbox => {
            console.log('value', checkbox.value);
        })
        console.log('event', checkBoxes);

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
            const { gameOptions } = this.state;
            console.log('gameOptions', gameOptions);
            return (
                <>
                    <Title title={ChooseOptions.TITLE}/>
                    <div className="game-options-container">
                        <WinCriterion winCriterion={gameOptions.winCriterion}/>
                        <QuestionTypes questionTypes={gameOptions.questionTypes}
                                       evaluateWinCriterionMaxValue={this.evaluateWinCriterionMaxValue}/>
                    </div>
                    <NextButton sizeClass="large-button" content="Suivant"/>
                </>
            )
        }
    }


}