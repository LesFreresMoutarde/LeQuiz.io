const GameUtil = require("../util/GameUtil");

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



    actionCategories = async () => {
        const response = {};
        try {
            response.categories = await this.getCategories();
            this.response = response;
        } catch (error) {
            this.statusCode = 400;
            response.error = error;
            this.response = response;
        }
    };

    actionGenerateRoomCode = () => {
        const response = {};

        response.roomCode = this.generateRoomIdentifier();

        this.response = response;
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
    
    actionOptions = async (gameMode, categories) => {
        const response = {
            gameOptions: {}
        };

        try {
            response.gameOptions.questionTypes = await this.getQuestionTypes(categories);
            response.gameOptions.winCriterion = this.getWinCriterion(gameMode);
            this.response = response;
        } catch (error) {
            console.error(error);
            this.statusCode = 400;
            response.error = error;
            this.response = response;
        }
    };

    actionVerifyRoom = (roomIdentifier) => {
        const response = {};
        console.log("le roomIdentifier", roomIdentifier);
        console.log('ROOMS ID', GameUtil.ROOMS_ID);
        console.log('Boolean', GameUtil.ROOMS_ID.includes(roomIdentifier))
        response.isRoomValid = GameUtil.ROOMS_ID.includes(roomIdentifier);
        this.response = response;
    };

    generateRoomIdentifier = () => {
        let roomIdentifier = '';
        const possibilities = "abcdefghijklmnopqrstuvwxyz0123456789";


        while (GameUtil.ROOMS_ID.includes(roomIdentifier) || roomIdentifier === '') {

            roomIdentifier = "";

            for (let i = 0; i < 6; i++) {
                roomIdentifier += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
            }
        }

        GameUtil.ROOMS_ID.push(roomIdentifier);

        return roomIdentifier
    };



    getAllowedGameModes = (plan) => {

        if (!GameController.GAME_MODE_PERMISSIONS.hasOwnProperty(plan)) throw 'Unknown plan';

        const allowedGameModes = [];
        for (const gameMode of GameController.GAME_MODES) {

            let isGameModeAllowed = false;

            if (GameController.GAME_MODE_PERMISSIONS[plan].includes(gameMode)) {
                isGameModeAllowed = true;
            }

            allowedGameModes.push({
                classname: gameMode.CLASSNAME,
                label: gameMode.LABEL,
                description: gameMode.DESCRIPTION,
                allowed: isGameModeAllowed,
            });

        }

        return allowedGameModes;
    };

    getCategories = async () => {

        const categories = [];

        const records = await db.sequelize.query(`SELECT "category"."id", "category"."name", 
            COUNT(*) as "nbQuestions", "question"."type" FROM "category" 
            INNER JOIN "category_question" ON "category"."id" = "category_question"."categoryId"
            INNER JOIN "question" ON "category_question"."questionId" = "question"."id"
            WHERE "question"."status" = 'approved'
            GROUP BY "category"."id", "question"."type"
            ORDER BY "category"."id";`, {
            type: db.sequelize.QueryTypes.SELECT
        });

        for (let i = 0; i < records.length; i++) {
            if (i === 0) {
                categories.push({
                    id: records[i].id,
                    name: records[i].name,
                    nbQuestions : {
                        [records[i].type]: records[i].nbQuestions
                    }
                })
            } else if (records[i-1].id === records[i].id) {
                categories[i-1]['nbQuestions'][[records[i].type]] = records[i].nbQuestions
            } else {
                categories.push({
                    id: records[i].id,
                    name: records[i].name,
                    nbQuestions : {
                        [records[i].type]: records[i].nbQuestions
                    }
                })
            }
        }

        return categories;
    };

    getQuestionTypes = async (categories) => {

         return await db.sequelize.query(`SELECT "question"."type", COUNT(*) as "nbQuestions" FROM "question"
            INNER JOIN "category_question" ON "question"."id" = "category_question"."questionId"
            WHERE "category_question"."categoryId" IN (:categories)
            AND "question"."status" = :status
            GROUP BY "question"."type"`,
            {
                replacements: {
                    categories: categories,
                    status: db.Question.STATUS_APPROVED
                },
                type: db.sequelize.QueryTypes.SELECT
        });

    };

    getWinCriterion = (gameMode) => {

        let winCriterion = null;

        GameController.GAME_MODES.map(gameModeClass => {
            if (gameModeClass.CLASSNAME === gameMode) {
                winCriterion = gameModeClass.WIN_CRITERION;
            }
        });

        if (!winCriterion) throw new Error('Invalid Game Mode');

        return winCriterion;
    };


}

module.exports = GameController;