import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Title from "../../../misc/Title";
import Loader from "../../../misc/Loader";
import Category from "../components/Category";
import NextButton from "../../../misc/NextButton";
import PickAll from "../../../misc/PickAll";
import UnpickAll from "../../../misc/UnpickAll";
import BackArrow from "../../../misc/BackArrow";
import Toastr from "toastr2";
import ApiUtil from "../../../../util/ApiUtil";
const toastr = new Toastr();

export default class ChooseCategories extends React.Component {

    static TITLE = 'Choisissez des thèmes';

    pickedCategories = [];

    constructor(props) {
        super(props);
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
                const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                const categories = await this.getCategories();

                console.log(categories)

                this.setState({
                    isLoading: false,
                    categories
                });

                if (gameConfiguration.categories.length > 0) {
                    gameConfiguration.categories.map(category => this.pickCategory(category));
                }
            } catch (error) {
                toastr.error('Impossible d\'afficher les catégories, réessayez ultérieurement')
            }
        })();
    }

    getCategories = async () => {
        const response = await ApiUtil.performAPIRequest('/game/categories');

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
        this.props.submit(this.pickedCategories);
    };

    goBack = () => {
        this.props.goBack('chooseCategories');
    }

    render() {
        if (this.state.isLoading) {
            return (
                <>
                    <div className="create-game-header">
                        <BackArrow onClick={this.goBack}/>
                        <Title title={ChooseCategories.TITLE}/>
                    </div>
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
                    <div className="create-game-header">
                        <BackArrow onClick={this.goBack}/>
                        <Title title={ChooseCategories.TITLE}/>
                    </div>
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
                                displayClass="visible"
                    />
                </>
            )
        }
    }
}
