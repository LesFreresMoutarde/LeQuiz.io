import Util from "./Util";
import latinize from "latinize";
import  { distance } from "fastest-levenshtein";

class GameUtil {

    static QUIZ_SESSION_STORAGE_KEY = 'quiz';

    static ROUND_TIME = 12*1000;

    static SCORES_TIME = 5*1000;

    static HARDCORE_DIFFICULTY = 'hardcore';

    static STANDARD_DIFFICULTY = 'standard';

    static ERRORS_ALLOWED_COUNT_PROPERTY_NAME = 'errorAllowedCount';

    static GAME_CONFIGURATION = {
        key: 'gameConfiguration',
        optionsNeeded: {
            'categories': {
                properties: ['gameMode'],
                redirect: '/create-room/game-mode'
            },
            'options': {
                properties: ['gameMode', 'categories'],
                redirect: '/create-room/categories'
            }
        }
    };

    static MAX_QUESTIONS = {
        'Serie': 100,
    }

    static checkGameConfiguration = (history) => {
        const { pathname } = history.location;
        const slug = pathname.split('/')[pathname.split('/').length - 1];
        let check = {
            verified: true
        };

        const gameConfiguration = Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key);
        GameUtil.GAME_CONFIGURATION.optionsNeeded[slug].properties.map(option => {
            if (!gameConfiguration[option]) {
                check.verified = false;
                check.redirect = GameUtil.GAME_CONFIGURATION.optionsNeeded[slug].redirect;
            }
        });

        return check;
    }

    static getWinCriterionMaxValue =
    (
            gameMode,
            pickedCategories,
            categoriesCouple,
            questionTypesAvailable,
            pickedQuestionTypes,
            withHardcoreQuestions
    ) => {

        const questionTypesAvailableName = questionTypesAvailable.map(questionType => (questionType.name));
        const questionTypesInputName = pickedQuestionTypes.map(questionTypeInput => (questionTypeInput.name));

        questionTypesInputName.forEach(questionTypeInputName => {
            if (!questionTypesAvailableName.includes(questionTypeInputName)) throw new Error('Invalid question type')
        });

        let max = 0;

        switch (gameMode) {
            case 'Serie':
                pickedCategories.forEach(category => {

                    pickedQuestionTypes.forEach(questionType => {

                        if (category.nbQuestions.hasOwnProperty(questionType.name)) {

                            for (const difficulty in category.nbQuestions[questionType.name]) {

                                if ((difficulty === GameUtil.HARDCORE_DIFFICULTY && withHardcoreQuestions)
                                    || (difficulty === GameUtil.STANDARD_DIFFICULTY))
                                {
                                    max += category.nbQuestions[questionType.name][difficulty];
                                }
                            }
                        }
                    })
                })

                const categoriesCoupleQuestionCount = GameUtil.getCategoriesCoupleQuestionCount
                (
                    pickedCategories,
                    categoriesCouple,
                    withHardcoreQuestions
                );

                max -= categoriesCoupleQuestionCount;

                if (max > GameUtil.MAX_QUESTIONS[gameMode]) max = GameUtil.MAX_QUESTIONS[gameMode];
                break;
            case 'Ascension':
                break;

            case 'Blitz':
                break;

            case 'Survivant':
                break;

            default:
                throw new Error('Invalid Game Mode')
        }

        return max;
    }

    static validateInRoomModifiedGameConfiguration = (updatedGameConfiguration) => {

        const questionTypesName = updatedGameConfiguration.questionTypes.map(questionType => questionType.name);

        const questionTypesToRemove = [];

        const questionCountPerCategory = updatedGameConfiguration.categories.map(category => category.nbQuestions);

        // Verify if every picked question types is available in picked categories
        questionTypesName.forEach((questionTypeName, index) => {
            if (!questionCountPerCategory
                .some(categoryQuestionCount => categoryQuestionCount.hasOwnProperty(questionTypeName)))
            {
                questionTypesToRemove.push(index);
            }
        })

        // If not they are removed
        for (let i = questionTypesToRemove.length - 1; i >= 0; i--) {
            updatedGameConfiguration.questionTypes.splice(questionTypesToRemove[i],1);
        }

        // If configuration previously set withHardcoreQuestions at true
        if (updatedGameConfiguration.withHardcoreQuestions) {

            // We ensure that the hardcore difficulty is available in at least one category
            updatedGameConfiguration.withHardcoreQuestions = questionCountPerCategory.some(categoryQuestionsCount => {
                if (Object.values(categoryQuestionsCount)
                    .some(difficulties => difficulties.hasOwnProperty(GameUtil.HARDCORE_DIFFICULTY)))
                    return true;
            });
        }

        let maxPossible = 0

        // We calculate maximum number of questions possible with current configuration
        questionCountPerCategory.forEach((questionCountForOneCategory) => {
            maxPossible += GameUtil.getQuestionCountTotalThroughCategory
            (
                questionCountForOneCategory,
                updatedGameConfiguration.withHardcoreQuestions
            )
        })

        const categoriesCoupleQuestionCount = GameUtil.getCategoriesCoupleQuestionCount
        (
            updatedGameConfiguration.categories,
            updatedGameConfiguration.categoriesCouple,
            updatedGameConfiguration.withHardcoreQuestions
        );

        maxPossible -= categoriesCoupleQuestionCount;

        // If it's superior to the maximum set for the picked game mode, value is rectified
        if (maxPossible > GameUtil.MAX_QUESTIONS[updatedGameConfiguration.gameMode.classname])
            maxPossible = GameUtil.MAX_QUESTIONS[updatedGameConfiguration.gameMode.classname]

        // If previous winCriterion is superior to the maximum possible, the winCriterion is updated
        if (updatedGameConfiguration.winCriterion > maxPossible)
            updatedGameConfiguration.winCriterion = maxPossible;

        Util.addObjectToSessionStorage(GameUtil.GAME_CONFIGURATION.key, updatedGameConfiguration);
        return updatedGameConfiguration;
    }

    static getRoundPoints = (answer, question, isQcmEnabled) => {
        const isGoodAnswer = GameUtil.verifyAnswer(answer, question, isQcmEnabled);

        if (isGoodAnswer) {
            return isQcmEnabled ? 1 : 2;
        }

        return 0;
    }

    static verifyAnswer = (answer, question, isQcmEnabled) => {

        if (isQcmEnabled) return answer['is_good_answer'];

        return question.answer.answers.input.findIndex(validAnswer => GameUtil.verifyInputAnswer(answer, validAnswer)) >= 0;
    }

    static verifyInputAnswer =  (proposition, answer) => {

        const errorAllowedCount = answer.hasOwnProperty(GameUtil.ERRORS_ALLOWED_COUNT_PROPERTY_NAME)
            ? answer[GameUtil.ERRORS_ALLOWED_COUNT_PROPERTY_NAME]
            : 1;

        return distance(latinize(proposition.toLowerCase()), latinize(answer.content.toLowerCase())) <= errorAllowedCount;
    }

    static getCategoriesCoupleQuestionCount = (pickedCategories, categoriesCouples, withHardcoreQuestions) => {
        let questionInCoupleCount = 0;

        const pickedCategoriesName = pickedCategories.map(category => category.name).sort();

        categoriesCouples.forEach(couple => {
            const [firstCategory, secondCategory] = couple.name.split('|');

            if (pickedCategoriesName.includes(firstCategory) && pickedCategoriesName.includes(secondCategory)) {
                questionInCoupleCount += GameUtil.getQuestionCountTotalThroughCategory
                (
                    couple.nbQuestions,
                    withHardcoreQuestions
                )
            }
        })

        return questionInCoupleCount;
    }

    static getQuestionCountTotalThroughCategory = (categoryQuestionCount, withHardcoreQuestions) => {
        let count = 0;
        Object.values(categoryQuestionCount).forEach(questionCountPerType => {
            for (const [difficulty, countPerDifficulty] of Object.entries(questionCountPerType)) {

                // We sum hardcore questions count only if the option has been picked
                if (difficulty === GameUtil.HARDCORE_DIFFICULTY ) {
                    count += withHardcoreQuestions ? countPerDifficulty : 0
                    continue;
                }

                count += countPerDifficulty
            }
        })

        return count;
    }

}

export default GameUtil;
