import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Title from "../../../misc/Title";
import Loader from "../../../misc/Loader";
import Category from "../components/Category";
import NextButton from "../../../misc/NextButton";
import PickAll from "../../../misc/PickAll";
import UnpickAll from "../../../misc/UnpickAll";
import ApiUtil from "../../../../util/ApiUtil";
import {app} from "../../../App";

export default class ChooseCategories extends React.Component {

    static TITLE = 'Catégories';

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            categories: null,
            pickAllDisabled: false,
            unpickAllDisabled: true,
            searchCategories: '',
            nextButtonDisabled: true,
        }
    }

    componentDidMount() {
        (async () => {
            try {
                const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                const categories = await this.getCategories();

                categories.forEach(category => {
                    category.selected = false;
                });

                this.setState({
                    isLoading: false,
                    categories,
                });

                gameConfiguration.categories.forEach(gameConfigurationCategory => {
                    const category = categories.find(category => category.id === gameConfigurationCategory.id);
                    this.pickCategory(category);
                });
            } catch (error) {
                app.toastr.error('Impossible d\'afficher les catégories, réessayez ultérieurement')
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
        category.selected = !category.selected;

        this.handleButtonsState();
    };

    pickAll = () => {
        const { categories } = this.state;

        categories.forEach((category) => {
            category.selected = true;
        });

        this.handleButtonsState();
    };

    unpickAll = () => {
        const { categories } = this.state;

        categories.forEach((category) => {
            category.selected = false;
        });

        this.handleButtonsState();
    };

    getPickedCategories = () => {
        return this.state.categories.filter(category => category.selected);
    }

    handleButtonsState = () => {
        const { categories } = this.state;
        const pickedCategories = this.getPickedCategories();

        if (pickedCategories.length === categories.length) {
            this.setState({
                pickAllDisabled: true,
                unpickAllDisabled: false,
                nextButtonDisabled: false,
            });
        } else if (pickedCategories.length === 0) {
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

    onSearchCategoriesInputChange = (e) => {
        this.setState({
            searchCategories: e.target.value,
        });
    }

    submitCategories = () => {
        this.props.submit(this.getPickedCategories());
    };

    render() {
        if (this.state.isLoading) {
            return (
                <>
                    <div className="create-game-header">
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
            const { categories, pickAllDisabled, unpickAllDisabled, nextButtonDisabled, searchCategories } = this.state;

            const filteredCategories = categories.filter((category) => {
                if (!searchCategories) {
                    return true;
                }

                if (category.label.toLowerCase().includes(searchCategories.toLowerCase())) {
                    return true;
                }

                if (category.name.toLowerCase().includes(searchCategories.toLowerCase())) {
                    return true;
                }

                return false;
            });

            return (
                <>
                    <div className="create-game-header">
                        <Title title={ChooseCategories.TITLE}/>
                    </div>

                    <div className="category-container">
                        <div className="category-container-header">
                            <PickAll pickAll={this.pickAll} disabled={pickAllDisabled}/>
                            <UnpickAll unpickAll={this.unpickAll} disabled={unpickAllDisabled}/>
                            <input className="search-categories-input"
                                   type="text"
                                   placeholder="Rechercher une catégorie"
                                   autoFocus={true}
                                   value={searchCategories}
                                   onChange={this.onSearchCategoriesInputChange}
                            />
                        </div>
                        <div className="category-list">
                            {filteredCategories.map((category, index) => {
                                return (
                                    <Category key={index} category={category} pickCategory={this.pickCategory} />
                                );
                            })}
                            {filteredCategories.length < 1 &&
                                <div className="category-list-no-category-found">
                                    Aucune catégorie ne correspond à votre recherche
                                </div>
                            }
                        </div>
                    </div>

                    <div className="selected-categories-container">
                        <div className="selected-categories-list">
                            scrollable
                        </div>
                    </div>

                    {/*<div className="category-container">*/}
                    {/*   {categories.map((category, index) => {*/}
                    {/*        if (index === 0) {*/}
                    {/*           return (*/}
                    {/*               <div key={index} className="category-wrapper">*/}
                    {/*                   <div className="pick-buttons-wrapper">*/}
                    {/*                       <PickAll id="pick-all" pickAll={this.pickAll} disabled={pickAllDisabled}/>*/}
                    {/*                       <UnpickAll unpickAll={this.unpickAll} disabled={unpickAllDisabled}/>*/}
                    {/*                   </div>*/}
                    {/*                   <Category category={category} pickCategory={this.pickCategory}/>*/}
                    {/*               </div>*/}
                    {/*           )*/}
                    {/*       } else {*/}
                    {/*           return (*/}
                    {/*               <div key={index} className="category-wrapper">*/}
                    {/*                   <Category category={category} pickCategory={this.pickCategory}/>*/}
                    {/*               </div>*/}
                    {/*           )*/}
                    {/*       }*/}
                    {/*   })}*/}
                    {/*</div>*/}
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
