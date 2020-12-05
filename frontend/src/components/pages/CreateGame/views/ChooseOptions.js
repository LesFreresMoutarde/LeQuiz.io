import React from "react";
import Title from "../../../misc/Title";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";


export default class ChooseOptions extends React.Component {

    static TITLE = 'Options de jeu';

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        (async () => {
            try {
                //TODO Vérifier la conf de la game
                const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                console.log(gameConfiguration);
                let gameMode = "Serie";
                const categoriesId = gameConfiguration.categories.map((category) => (category.id));

                // JV, Sport, Histoire
                if (categoriesId.length === 0) categoriesId.push('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',
                        "3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3",
                        "9bde0fff-731d-4fe2-939e-f737e926bd70")

                console.log("catID", categoriesId);
                const response = await Util.sendJsonToAPI('/game/options', {gameMode: gameMode, categories: categoriesId});

                if (!response.ok) throw new Error(`${response.status} : ${response.statusText}`);

                const responseData = await response.json();

                console.log(responseData);
                
            } catch (error) {
                console.error(error);
            }


        })();
    }

    getQuestionsInfo = () => {

    }

    render() {
        return (
            <>
              <Title title={ChooseOptions.TITLE}/>
                <p>Les options de jeu !!!!</p>
            </>
        );
    }


}