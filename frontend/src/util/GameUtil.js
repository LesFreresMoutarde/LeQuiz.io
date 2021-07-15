import Util from "./Util";
import latinize from "latinize";
import  { distance } from "fastest-levenshtein";

class GameUtil {

    static QUIZ_SESSION_STORAGE_KEY = 'quiz';

    static ROUND_TIME = 12*1000;

    static SCORES_TIME = 5*1000;

    static HARDCORE_DIFFICULTY = 'hardcore';

    static CLASSIC_DIFFICULTY = 'classic';

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

    static getWinCriterionMaxValue = (gameMode, pickedCategories,questionTypesAvailable, pickedQuestionTypes, withHardcoreQuestions) => {

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
                                    || (difficulty === GameUtil.CLASSIC_DIFFICULTY))
                                {
                                    max += category.nbQuestions[questionType.name][difficulty];
                                }
                            }
                        }
                    })
                })

                if (max > 100) max = 100;
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


    static verifyAnswer = (answer, question) => {

        const { type } = question

        let isGoodAnswer = false;

        switch (type) {
            case 'qcm':
                isGoodAnswer = answer['is_good_answer'];
                break;

            case 'input':
                for (let i = 0; i < question.answer.answers.length; i++) {

                    if (distance(latinize(answer.toLowerCase()), latinize(question.answer.answers[i].content.toLowerCase())) < 2)
                        isGoodAnswer = true;
                }
                break;
        }

        return isGoodAnswer;

    }

}

export default GameUtil;
