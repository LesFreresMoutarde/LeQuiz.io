const MainController = require('./mainController/MainController');
const Serie = require("../models/gameModes/Serie");
const Ascension = require("../models/gameModes/Ascension");
const Blitz = require("../models/gameModes/Blitz");
const Survivant = require("../models/gameModes/Survivant");

class GameController extends MainController {

    static GAME_MODES = [Serie, Ascension, Blitz, Survivant];

    // [var] : allow using a var value as a key of an object's property
    static GAME_MODE_PERMISSIONS = {
        [db.User.PLAN_FREE]: [Serie],
        [db.User.PLAN_PREMIUM]: [Serie, Ascension, Blitz, Survivant],
        [db.User.PLAN_VIP]: [Serie, Ascension, Blitz, Survivant]
    };

    actionCategories = () => {
        const response = {};
        try {
            response.categories = this.getCategories();
            console.log(response);
        } catch (error) {
            console.error(error);
            /*this.statusCode = 400;
            response.error = error;
            this.response = response;*/
        }
    }

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

    getCategories = async () => {
        try {
            const categories = await db.Category.findAll({
                where: db.sequelize.where(db.sequelize.literal('(SELECT COUNT(*) FROM category_question WHERE "Category"."id" = category_question."categoryId")'), '>',0)
            });
            categories.map(cat => {
                console.log(cat.toJSON())
            })
        } catch (error) {
           console.log(error);
        }
    }


}

module.exports = GameController;