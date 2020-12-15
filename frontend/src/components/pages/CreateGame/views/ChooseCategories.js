import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Title from "../../../misc/Title";
import Loader from "../../../misc/Loader";
import Category from "../components/Category";
import NextButton from "../../../misc/NextButton";
import PickAll from "../../../misc/PickAll";
import UnpickAll from "../../../misc/UnpickAll";


export default class ChooseCategories extends React.Component {

    static TITLE = 'Choisissez des thèmes';

    pickedCategories = [];

    constructor(props) {
        super(props);
        //console.log("les props de cate", props);
        this.state = {
            isLoading: true,
            categories: false,
            pickAllDisabled: false,
            unpickAllDisabled: true,
            nextButtonDisabled: true,
        }
    }

    componentDidMount() {
        (async () => {
            try {
                /* console.log("la conf de la game", Util.getObjectFromSessionStorage('gameConfiguration'));
                const checkConfiguration = GameUtil.checkGameConfiguration(this.props.history);

                if (!checkConfiguration.verified) {
                    this.props.history.replace(checkConfiguration.redirect);

                } else {*/
                    const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                    const categories = await this.getCategories();

                    this.setState({
                        isLoading: false,
                        categories
                    });

                    if (gameConfiguration.categories.length > 0) {
                        gameConfiguration.categories.map(category => this.pickCategory(category));
                    }
                 // }
            } catch (error) {
                console.log(error)
            }
        })();
    }

    getCategories = async () => {
        const response = await Util.performAPIRequest('/game/categories');

        if (!response.ok) throw 'error';

        const responseData = await response.json();

        return responseData.categories;
    };

    pickCategory = (category) => {

        const pickCategoriesId = this.pickedCategories.map(pickedCategory => (pickedCategory.id));

        if (!pickCategoriesId.includes(category.id)) {
            this.pickedCategories.push(category)

        } else {
            this.pickedCategories.splice(pickCategoriesId.indexOf(category.id), 1);
        }

        const categoryElt = document.querySelector(`#category-${category.name.toLowerCase()}`);
        categoryElt.classList.toggle('category-selected');

        this.handleButtonsState();
    };

    pickAll = () => {
        const { categories } = this.state;

        this.pickedCategories = [];

        this.pickedCategories.push(...categories);

        const categoriesElt = Array.from(document.querySelectorAll('.category'));

        categoriesElt.map((categoryElt) => {
            categoryElt.classList.remove('category-selected');
            categoryElt.classList.add('category-selected');
        });

        this.handleButtonsState();
    };

    unpickAll = () => {
        this.pickedCategories = [];

        const categoriesElt = Array.from(document.querySelectorAll('.category'));

        categoriesElt.map((categoryElt) => {
            categoryElt.classList.remove('category-selected');
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
        /*const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        gameConfiguration.categories = this.pickedCategories;
        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, gameConfiguration);

        //TODO Gerer le cas où l'utilisateur vient du lobby
        this.props.history.push('/create-room/options');*/


        this.props.submit(this.pickedCategories);
    };

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

            return (
                <>
                    <Title title={ChooseCategories.TITLE}/>
                    <div className="category-container">
                       {categories.map((category, index) => {
                            if (index === 0) {
                               return (
                                   <div key={index} className="category-wrapper">
                                       <div className="pick-buttons-wrapper">
                                           <PickAll id="pick-all" pickAll={this.pickAll} disabled={pickAllDisabled}/>
                                           <UnpickAll unpickAll={this.unpickAll} disabled={unpickAllDisabled}/>
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
                    <NextButton disabled={nextButtonDisabled}
                                onClick={this.submitCategories}
                                sizeClass="large-button"
                                content="Suivant"
                    />
                </>
            )
        }
    }
}