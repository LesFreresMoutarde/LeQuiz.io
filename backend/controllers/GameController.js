const MainController = require('./mainController/MainController');
const Serie = require("../models/gameModes/Serie");
const Ascension = require("../models/gameModes/Ascension");
const Blitz = require("../models/gameModes/Blitz");
const Survivant = require("../models/gameModes/Survivant");

class GameController extends MainController {


    static GAME_MODES = [Serie, Ascension, Blitz, Survivant];
    // [db.User] : allow to get property User of db object
    static GAME_MODE_PERMISSIONS = {
        [db.User.PLAN_FREE]: [Serie],
        [db.User.PLAN_PREMIUM]: [Serie, Ascension, Blitz, Survivant],
        [db.User.PLAN_VIP]: [Serie, Ascension, Blitz, Survivant]
    };


    actionModes = (plan) => {
        const response = {};
        try {
            response.gameModes = this.getAllowedGameModes(plan);
            this.response = response;
        } catch (error) {
            this.statusCode = 400;
            response.error = error;
            this.response = response;
        }
    };

    getAllowedGameModes = (plan) => {
        try {

            if (!GameController.GAME_MODE_PERMISSIONS.hasOwnProperty(plan)) throw 'Unknown plan';

            let allowedGameModes = [];
            for (const gameMode of GameController.GAME_MODES) {

                if (GameController.GAME_MODE_PERMISSIONS[plan].includes(gameMode)) {
                    allowedGameModes.push({
                        classname: gameMode.CLASSNAME,
                        label: gameMode.LABEL,
                        description: gameMode.DESCRIPTION,
                        allowed: true
                    })
                } else {
                    allowedGameModes.push({
                        classname: gameMode.CLASSNAME,
                        label: gameMode.LABEL,
                        description: gameMode.DESCRIPTION,
                        allowed: false
                    })
                }
            }
            return allowedGameModes;
        } catch (error) {
            throw error;
        }
    }

    generateCodeRoom = () => {
        let codeRoom = "";
        const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        //tableau à remplir des codes room déja réservé par d'autre rooms
        let arrayCodeRoom = [];

        while (arrayCodeRoom.includes(codeRoom) || codeRoom === "") {
            codeRoom = "";
            for (let i = 0; i < 6; i++) {
                codeRoom += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }

        return codeRoom;
    }
}

module.exports = GameController;