import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Title from "../../../misc/Title";
import Loader from "../../../misc/Loader";
import Category from "../components/Category";
import NextButton from "../../../misc/NextButton";


export default class ChooseCategories extends React.Component {

    static TITLE = 'Choisissez des thèmes';

    pickedCategories = [];

    constructor(props) {
        super(props);
        this.state = {
            gameConfiguration: Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key),
            isLoading: true,
            categories: false,
            pickAllDisabled: false,
            unpickAllDisabled: true,
            nextButtonDisabled: true,
        }
    }

    // TODO Initialiser le tableau pickedCategories si present dans la gameConfig
    componentDidMount() {
        (async () => {
            try {
                console.log("la conf de la game", Util.getObjectFromSessionStorage('gameConfiguration'));
                const checkConfiguration = GameUtil.checkGameConfiguration(this.props.history);

                if (!checkConfiguration.verified) {

                    this.props.history.replace(checkConfiguration.redirect);

                } else {
                    const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);

                    const categories = await this.getCategories();

                    this.setState({
                        isLoading: false,
                        categories
                    });

                    if (gameConfiguration.categories.length > 0) {
                        gameConfiguration.categories.map(category => this.pickCategory(category));

                        this.pickedCategories.push(...gameConfiguration.categories);
                    }
                    console.log("les categories choisies au start", this.pickedCategories);
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

            return responseData.categories;
        } catch (error) {
            throw error;
        }
    };

    pickCategory = (category) => {
        // event.persist();
        if (!this.pickedCategories.includes(category)) {
            this.pickedCategories.push(category)

        } else {
            this.pickedCategories.splice(this.pickedCategories.indexOf(category), 1);
        }

        const categoryElt = document.querySelector(`#category-${category.name.toLowerCase()}`);
        categoryElt.classList.toggle('purple-heart-bg');
        //event.currentTarget.classList.toggle('purple-heart-bg');

        this.handleButtonsState();
    };

    pickAll = () => {
        const { categories } = this.state;

        this.pickedCategories = [];

        this.pickedCategories.push(...categories);

        const categoriesElt = Array.from(document.querySelectorAll('.category'));

        categoriesElt.map((categoryElt) => {
            categoryElt.classList.remove('purple-heart-bg');
            categoryElt.classList.add('purple-heart-bg');
        });

        this.handleButtonsState();
    };

    unpickAll = () => {
        this.pickedCategories = [];

        const categoriesElt = Array.from(document.querySelectorAll('.category'));

        categoriesElt.map((categoryElt) => {
            categoryElt.classList.remove('purple-heart-bg');
        });

        this.handleButtonsState();
    };

    handleButtonsState = () => {
        const { categories } = this.state;

        if (this.pickedCategories.length === categories.length) {

            this.setState({
                pickAllDisabled: true,
                unpickAllDisabled: false,
                nextButtonDisabled: false,
            });

        } else if (this.pickedCategories.length === 0) {

            this.setState({
                pickAllDisabled: false,
                unpickAllDisabled: true,
                nextButtonDisabled: true,
            });

        } else {

            this.setState({
                pickAllDisabled: false,
                unpickAllDisabled: false,
                nextButtonDisabled: false,
            });

        }
    };

    submitCategories = () => {
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        gameConfiguration.categories.push(...this.pickedCategories);
        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);
        console.log(gameConfiguration);
        this.props.history.push('/create-room/settings');
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
            const { categories, pickAllDisabled, unpickAllDisabled, nextButtonDisabled } = this.state;
            console.log("cat from view",categories);
            return (
                <>
                    <Title title={ChooseCategories.TITLE}/>
                    <div className="category-container">
                       {categories.map((category, index) => {
                            if (index === 0) {
                               return (
                                   <div key={index} className="category-wrapper">
                                       <div className="pick-buttons-wrapper">
                                       <button id="pick-all" className="pick-buttons" onClick={this.pickAll} disabled={pickAllDisabled}>PickAll</button>
                                       <button id="unpick-all" className="pick-buttons" onClick={this.unpickAll} disabled={unpickAllDisabled}>UnpickAll</button>
                                       </div>
                                       <Category category={category} pickCategory={this.pickCategory}/>
                                   </div>
                               )
                           } else {
                               return (
                                   <div key={index} className="category-wrapper">
                                       <Category category={category} pickCategory={this.pickCategory}/>
                                   </div>
                               )
                           }
                       })}
                    </div>
                    <NextButton disabled={nextButtonDisabled} submitCategories={this.submitCategories} sizeClass="large-button"/>
                </>
            )
        }
    }
}