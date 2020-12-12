import Util from "./Util";

class GameUtil {

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

               /* console.log(questionTypesAvailable, questionTypesInput);

                for (const questionType of questionTypesAvailable) {
                    if (!questionTypesInput.hasOwnProperty(questionType.type))
                        throw new Error('Invalid Question Type');*/
               for (const questionTypeInput of questionTypesInput) {
                   console.log("booru de",questionTypeInput);
                   if (questionTypeInput.checked) max += Number(questionTypeInput.nbQuestions);
               }

                    // if (questionTypesInput[questionType.type])
                    //     max+= Number(questionType.nbQuestions);
                //}

                /*for (let i = 0; i < questionTypesAvailable.length; i++) {

                    if (!questionTypesAvailable[i].type === questionTypesInput[i].value) {
                        throw new Error('Invalid Question Type');
                    }

                    if (questionTypesInput[i].checked) {
                        max+= Number(questionTypesAvailable[i].nbQuestions);
                    }

                }*/

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
}

export default GameUtil;
