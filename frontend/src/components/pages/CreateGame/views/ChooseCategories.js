import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Title from "../../../misc/Title";
import Loader from "../../../misc/Loader";


export default class ChooseCategories extends React.Component {

    static TITLE = 'Choisissez des thèmes';

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
                const checkConfiguration = GameUtil.checkGameConfiguration(this.props.history);

                if (!checkConfiguration.verified) {
                    this.props.history.replace(checkConfiguration.redirect);
                } else {
                    const categories = await this.getCategories();
                    this.setState({
                        isLoading: false,
                        categories
                    })
                }
            } catch (error) {
                console.log(error)
            }
        })();
    }

    getCategories = async () => {
        try {
            const response = await Util.performAPIRequest('/game/categories');

            if (!response.ok) throw 'error';

            const responseData = await response.json();
            const categories = responseData.categories;
            console.log('categories', categories);

            return categories;
        } catch (error) {
            throw error;
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <>
                    <Title title={ChooseCategories.TITLE}/>
                    <div className="app loading">
                        <div className="app-loader">
                            <Loader width="max(6vw, 80px)"/>
                        </div>
                    </div>
                </>
            );
        } else {
            const { categories } = this.state;
            console.log("cat from view",categories);
            return (
                <>
                    <Title title={ChooseCategories.TITLE}/>
                    {categories.map((category, index) => {
                        return <div key={index}><p>{category.name}</p></div>
                    })}
                </>
            )
        }
    }
}