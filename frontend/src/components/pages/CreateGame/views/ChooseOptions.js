import React from "react";
import Title from "../../../misc/Title";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";
import Loader from "../../../misc/Loader";
import WinCriterion from "../components/WinCriterion";

import NextButton from "../../../misc/NextButton";
import QuestionTypes from "../components/QuestionTypes";
import BackArrow from "../../../misc/BackArrow";
import Toastr from "toastr2";
import ApiUtil from "../../../../util/ApiUtil";
const toastr = new Toastr();

export default class ChooseOptions extends React.Component {

    static TITLE = 'Options de jeu';

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            gameOptions: false,
            nextButtonDisabled: true,
            winCriterionMaxValue: 0,
            winCriterionInputValue: 0,
            questionTypes: [],
            showHardcoreQuestionInput: false,
            withHardcoreQuestions: false,
        };

    }

    componentDidMount() {
        (async () => {
            try {

                let { winCriterionInputValue, withHardcoreQuestions } = this.state;
                const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
                const categoriesId = gameConfiguration.categories.map((category) => (category.id));
                const gameMode = gameConfiguration.gameMode.classname;

                const response = await ApiUtil.sendJsonToAPI('/game/options', {gameMode: gameMode, categories: categoriesId});

                if (!response.ok) throw new Error(`${response.status} : ${response.statusText}`);

                const responseData = await response.json();

                const questionTypes = responseData.gameOptions.questionTypes.slice();

                questionTypes.forEach(questionType => {
                     questionType.checked = true;
                });

                if (gameConfiguration.questionTypes.length > 0) {

                    const pickedQuestionTypes = gameConfiguration.questionTypes.map(questionType => questionType.name);

                    questionTypes.forEach(questionType => {
                        if (!pickedQuestionTypes.includes(questionType.name))
                            questionType.checked = false;
                    });

                   winCriterionInputValue = gameConfiguration.winCriterion;
                   withHardcoreQuestions = gameConfiguration.withHardcoreQuestions;
                }

                this.setState({
                    isLoading: false,
                    gameOptions: responseData.gameOptions,
                    questionTypes,
                    winCriterionInputValue,
                    withHardcoreQuestions,
                    showHardcoreQuestionsInput: this.isHardcoreSettingsVisible(gameConfiguration.categories)
                });

                this.evaluateWinCriterionMaxValue();


            } catch (error) {
                toastr.error('Impossible d\'afficher les options de jeu, réessayez ultérieurement')
            }
        })();
    }

    pickQuestionType = (questionTypePicked) => {
        try {
            const { questionTypes } = this.state;
            const questionTypesLabel = questionTypes.map(questionType => (questionType.name));

            if (!questionTypesLabel.includes(questionTypePicked.name))
                throw new Error('Invalid Question Type');

            questionTypes.forEach(questionType => {
                if (questionType.name === questionTypePicked.name) questionType.checked = questionTypePicked.checked;
            });

            this.setState({questionTypes});

            this.evaluateWinCriterionMaxValue()

        } catch (error) {
            toastr.error('Ce type de question n\'existe pas')
        }
    }

    onHardcoreQuestionsChange = (evt) => {
        this.setState({withHardcoreQuestions: evt.currentTarget.checked});
        setTimeout(() => {
            this.evaluateWinCriterionMaxValue();
        },0);
    }

    evaluateWinCriterionMaxValue = () => {

        const questionTypesAvailable = this.state.gameOptions.questionTypes;
        const { questionTypes, withHardcoreQuestions } = this.state;
        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        const pickedQuestionTypes = questionTypes.filter(questionType => questionType.checked)

        const winCriterionMaxValue = GameUtil.getWinCriterionMaxValue
        (
            gameConfiguration.gameMode.classname,
            gameConfiguration.categories,
            questionTypesAvailable,
            pickedQuestionTypes,
            withHardcoreQuestions
        );

        this.setState({winCriterionMaxValue});

        this.validateWinCriterionValue(winCriterionMaxValue);

    };


    validateWinCriterionValue = (winCriterionMaxValue, winCriterionInputValue= null, event = null) => {

        let nextButtonDisabled = true;

        if (!winCriterionInputValue) winCriterionInputValue = this.state.winCriterionInputValue;

        if (event) winCriterionInputValue = event.target.value;

        winCriterionInputValue = winCriterionInputValue > winCriterionMaxValue
            ? winCriterionMaxValue : winCriterionInputValue;


        if (winCriterionInputValue > 0)  nextButtonDisabled = false;

        this.setState({winCriterionInputValue, nextButtonDisabled})

    };

    isHardcoreSettingsVisible = (categories) => {
        return categories.some(category => {
            for (const type in category.nbQuestions) {
                if (category.nbQuestions[type].hasOwnProperty(GameUtil.HARDCORE_DIFFICULTY)) {
                    return true;
                }
            }
        })
    }

    submitGameOptions = async () => {
        const { questionTypes, winCriterionInputValue, withHardcoreQuestions } = this.state;

        questionTypes.forEach(questionType => {
            if (questionType.checked) {
                delete questionType.checked;
            }
        });

        this.props.submit(questionTypes, winCriterionInputValue, withHardcoreQuestions);

    };

    goBack = () => {
        this.props.goBack('chooseOptions')
    }

    render() {
        if (this.state.isLoading) {
            return (
                <>
                    <div className="create-game-header">
                        <BackArrow onClick={this.goBack}/>
                        <Title title={ChooseOptions.TITLE}/>
                    </div>
                    <div className="app loading">
                        <div className="app-loader">
                            <Loader width="max(6vw, 80px)"/>
                        </div>
                    </div>
                </>
            );
        } else {
            const {
                gameOptions,
                winCriterionMaxValue,
                nextButtonDisabled,
                questionTypes,
                winCriterionInputValue,
                withHardcoreQuestions,
                showHardcoreQuestionsInput
            } = this.state;

            return (
                <>
                    <div className="create-game-header">
                        <BackArrow onClick={this.goBack}/>
                        <Title title={ChooseOptions.TITLE}/>
                    </div>
                    <div className="game-options-container">
                        <WinCriterion
                            winCriterion={gameOptions.winCriterion}
                            winCriterionMaxValue={winCriterionMaxValue}
                            winCriterionInputValue={winCriterionInputValue}
                            validateWinCriterionValue={this.validateWinCriterionValue}
                        />
                        <QuestionTypes questionTypes={questionTypes}
                                       pickQuestionType={this.pickQuestionType}
                        />
                        {showHardcoreQuestionsInput &&
                            <>
                                <p>Ajouter les questions "hardcore"</p>
                                <input type="checkbox"
                                       style={{opacity: 1}}
                                       onChange={(e) => this.onHardcoreQuestionsChange(e)}
                                       checked={withHardcoreQuestions}
                                />
                            </>
                        }
                    </div>
                    <NextButton disabled={nextButtonDisabled}
                                onClick={this.submitGameOptions}
                                sizeClass="large-button"
                                content="Suivant"
                                displayClass="visible"/>
                </>
            )
        }
    }

}
