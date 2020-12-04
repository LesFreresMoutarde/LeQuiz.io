import Util from "./Util";

class GameUtil {

    static GAME_CONFIGURATION = {
        key: 'gameConfiguration',
        optionsNeeded: {
            'categories': {
                properties: ['gameMode'],
                redirect: '/create-room/game-mode'
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
}

export default GameUtil;
