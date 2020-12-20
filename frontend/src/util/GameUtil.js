import Util from "./Util";

class GameUtil {

    static QUIZ_SESSION_STORAGE_KEY = 'quiz';

    static ROUND_TIME = 12*1000;

    QUESTION_TIMEOUT_ID;

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

    static getWinCriterionMaxValue = (gameMode, questionTypesAvailable, questionTypesInput) => {

        const questionTypesAvailableLabel = questionTypesAvailable.map(questionType => (questionType.type));
        const questionTypesInputLabel = questionTypesInput.map(questionTypeInput => (questionTypeInput.type));

        let max = 0;

        questionTypesInputLabel.forEach(questionTypeInputLabel => {
            if (!questionTypesAvailableLabel.includes(questionTypeInputLabel)) throw new Error('Invalid question type')
        });

        switch (gameMode) {
            case 'Serie':

                for (const questionTypeInput of questionTypesInput) {
                    if (questionTypeInput.checked) max += Number(questionTypeInput.nbQuestions);
                }

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


    static verifyAnswer = (answer, type) => {

        let isGoodAnswer = false;

        switch (type) {
            case 'qcm':
                console.log("la reponse depuis la verif", answer)
                isGoodAnswer = answer['is_good_answer'];
                break;

            case 'input':
                break;
        }

    return isGoodAnswer;

    }

}

export default GameUtil;
