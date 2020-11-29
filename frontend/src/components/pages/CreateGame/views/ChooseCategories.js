import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";


export default class ChooseCategories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameConfiguration: Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key),
            isLoading: true,
            categories: false,
        }
    }

    componentDidMount() {
        (async () => {
            try {
                console.log("la conf de la game", Util.getObjectFromSessionStorage('gameConfiguration'))
                GameUtil.checkGameConfiguration(this.props.history);
                await this.getCategories()
            } catch (error) {
                console.log(error)
            }
        })();
    }

    getCategories = async () => {
        try {
            const response = await Util.performAPIRequest('/game/categories');

            if (!response.ok) throw 'error';

            const categories = await response.json();

            console.log('categories', categories);
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (<p>Les catégories</p>)
    }
}