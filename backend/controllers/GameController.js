const MainController = require('./mainController/MainController');
const Serie = require("../models/gameModes/Serie");
const Ascension = require("../models/gameModes/Ascension");
const Blitz = require("../models/gameModes/Blitz");
const Survivant = require("../models/gameModes/Survivant");

class GameController extends MainController {

    // [db.User] : allow to get property User of db object
    static GAME_MODE_PERMISSIONS = {
        [db.User.PLAN_FREE]: [Serie],
        [db.User.PLAN_PREMIUM]: [Serie, Ascension, Blitz, Survivant],
        [db.User.PLAN_VIP]: [Serie, Ascension, Blitz, Survivant]
    };


    actionModes = (role) => {
        const response = {};
        try {
            response.gameModes = this.getAllowedGameModes(role);
            this.response = response;
        } catch (error) {
            this.statusCode = 400;
            response.error = error;
            this.response = response;
            //throw error;
        }
    };

    getAllowedGameModes = (role) => {
        try {

            if (!GameController.GAME_MODE_PERMISSIONS.hasOwnProperty(role)) throw 'Unknown role';

            let allowedGameModes = [];
            for (let [plan, gameModes] of Object.entries(GameController.GAME_MODE_PERMISSIONS)) {

                if (plan === role) {

                    for (let gameMode of gameModes) {
                        allowedGameModes.push({classname: gameMode.CLASSNAME, label: gameMode.LABEL, description: gameMode.DESCRIPTION});
                    }
                }
            }
            return allowedGameModes;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GameController;