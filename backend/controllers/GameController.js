const GameUtil = require("../util/GameUtil");
const RoomManager = require("../manager/RoomManager");
const MainController = require('./mainController/MainController');
const Serie = require("../models/gameModes/Serie");
const Ascension = require("../models/gameModes/Ascension");
const Blitz = require("../models/gameModes/Blitz");
const Survivant = require("../models/gameModes/Survivant");

const DatabaseError = require("../errors/misc/DatabaseError");
const GameModeNotFoundError = require("../errors/game/GameModeNotFoundError");
const UserPlanNotFoundError = require("../errors/user/UserPlanNotFoundError");

class GameController extends MainController {

    static GAME_MODES = [Serie, Ascension, Blitz, Survivant];

    // [var] : allow using a var value as a key of an object's property
    static GAME_MODE_PERMISSIONS = {
        [db.User.PLAN_FREE]: [Serie],
        [db.User.PLAN_PREMIUM]: [Serie, Ascension, Blitz, Survivant],
        [db.User.PLAN_VIP]: [Serie, Ascension, Blitz, Survivant]
    };

    static HARDCORE_DIFFICULTY = 'hardcore';
    static STANDARD_DIFFICULTY = 'standard';

    actionCategories = async () => {
        const response = {};
        response.categories = await this.getCategories();
        this.response = response;
    };

    actionCreateRoom = () => {
        const response = {}

        const roomId = RoomManager.generateRoomId();

        RoomManager.createRoom(roomId);

        response.roomCode = roomId;

        this.response = response;
    }

    actionModes = (plan) => {
        const response = {};
        response.gameModes = this.getAllowedGameModes(plan);
        this.response = response;
    };
    
    actionOptions = async (gameMode, categories) => {
        const response = {
            gameOptions: {}
        };

        response.gameOptions.questionTypes = await this.getQuestionTypes(categories);
        response.gameOptions.winCriterion = this.getWinCriterion(gameMode);
        this.response = response;
    };

    actionVerifyRoom = (roomId) => {
        const response = {};

        response.isRoomValid = RoomManager.rooms.hasOwnProperty(roomId);

        this.response = response;
    };

    getAllowedGameModes = (plan) => {

        if (!GameController.GAME_MODE_PERMISSIONS.hasOwnProperty(plan)) throw new UserPlanNotFoundError();

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

        try {
            const categories = [];

            const records = await db.sequelize.query(`SELECT "category"."id", "category"."name", "category"."label",
            COUNT(*) as "nbQuestions", "question_type"."name" as "type", "question"."isHardcore"
            FROM "category"
            INNER JOIN "category_question"
            ON "category"."id" = "category_question"."categoryId"
            INNER JOIN "question"
            ON "question"."id" = "category_question"."questionId"
            INNER JOIN "question_type_question"
            ON "question_type_question"."questionId" = "category_question"."questionId"
            INNER JOIN "question_type"
            ON "question_type"."id" = "question_type_question"."questionTypeId"
            WHERE "question"."status" = :status
            GROUP BY "category"."id", "type", "question"."isHardcore"
            ORDER BY "category"."name";`,
                {
                    replacements: {
                        status: db.Question.STATUS_APPROVED
                    },
                    type: db.sequelize.QueryTypes.SELECT
                }
            );
            // console.log(records);
            // On construit pour chaque catégorie un objet nbQuestions qui correspond au nombre de questions
            // par type de question et niveau de difficulté
            for (let i = 0; i < records.length; i++) {

                const key = records[i].isHardcore
                    ? GameController.HARDCORE_DIFFICULTY
                    : GameController.STANDARD_DIFFICULTY;

                if (i !== 0 && records[i-1].id === records[i].id) {
                    categories.forEach(categoryInArray => {
                        if (categoryInArray.id === records[i].id) {
                            categoryInArray['nbQuestions'][[records[i].type]] = {
                                ...categoryInArray['nbQuestions'][[records[i].type]],
                                ... {[key]: parseInt(records[i].nbQuestions)}
                            }
                        }
                    })

                } else {
                    categories.push({
                        id: records[i].id,
                        name: records[i].name,
                        label: records[i].label,
                        nbQuestions : {
                            [records[i].type]: {[key]: parseInt(records[i].nbQuestions)}
                        },
                    })
                }
            }
           // return categories;


            // Second query
            const records2 = await db.sequelize.query(`SELECT COUNT("category_question_1"."questionId") AS "nbQuestions", CONCAT("cat_1"."id",'|', "cat_2"."id") AS "categories_id",
                CONCAT("cat_1"."name",'|', "cat_2"."name") AS "categories_name",
                "question_type"."name" AS "type", "question"."isHardcore"
                FROM category_question AS "category_question_1"
                INNER JOIN category_question AS "category_question_2" ON "category_question_1"."questionId" = "category_question_2"."questionId"
                INNER JOIN category AS "cat_1" ON "category_question_2"."categoryId" = "cat_1"."id"
                INNER JOIN category AS "cat_2" ON "category_question_1"."categoryId" = "cat_2"."id"
                INNER JOIN "question_type_question" ON "question_type_question"."questionId" = "category_question_1"."questionId"
                INNER JOIN "question_type" ON "question_type"."id" = "question_type_question"."questionTypeId"
                INNER JOIN "question" ON "question"."id" = "category_question_1"."questionId"
                WHERE "category_question_1"."questionId" =  "category_question_2"."questionId"
                AND "category_question_1"."categoryId" != "category_question_2"."categoryId"
                AND "question"."status" = :status
                GROUP BY "categories_id", "categories_name", "type", "question"."isHardcore"
                ORDER BY "nbQuestions" DESC, "categories_name" ASC`,
                {
                    replacements: {
                        status: db.Question.STATUS_APPROVED
                    },
                    type: db.sequelize.QueryTypes.SELECT
                }
            );

            console.log(records2);
            const cate = [];
            for (let i = 0; i < records2.length; i++) {

                const key = records2[i].isHardcore
                    ? GameController.HARDCORE_DIFFICULTY
                    : GameController.STANDARD_DIFFICULTY;

                if (i !== 0 && records2[i-1]['categories_id'] === records2[i]['categories_id']) {
                    cate.forEach(categoryInArray => {
                        if (categoryInArray.id === records2[i]['categories_id']) {
                            categoryInArray['nbQuestions'][[records2[i].type]] = {
                                ...categoryInArray['nbQuestions'][[records2[i].type]],
                                ... {[key]: parseInt(records2[i].nbQuestions)}
                            }
                        }
                    })
                } else {
                    cate.push({
                        id: records2[i]['categories_id'],
                        name: records2[i]['categories_name'],
                        nbQuestions : {
                            [records2[i].type]: {[key]: parseInt(records2[i].nbQuestions)}
                        },
                    })
                }
            }
            console.log(cate);

            return cate;
        } catch (error) {
            console.error(error);
            throw new DatabaseError();
        }

    };

    getQuestionTypes = async (categories) => {
        try {
            return await db.sequelize.query(`SELECT "question_type"."name", "question_type"."label",
            "question_type"."id", COUNT(*) as "nbQuestions"
            FROM "question_type" 
            INNER JOIN "question_type_question" ON "question_type"."id" = "question_type_question"."questionTypeId"
            INNER JOIN "question" ON "question"."id" = "question_type_question"."questionId"
            INNER JOIN "category_question" ON "category_question"."questionId" = "question"."id"
            INNER JOIN "category" ON "category"."id" = "category_question"."categoryId"
            WHERE "category_question"."categoryId" IN (:categories)
            AND "question"."status" = :status
            GROUP BY "question_type"."name", "question_type"."label", "question_type"."id"
            ORDER BY "question_type"."label";`,
                {
                    replacements: {
                        status: db.Question.STATUS_APPROVED,
                        categories: categories
                    },
                    type: db.sequelize.QueryTypes.SELECT
                });
        } catch (error) {
            throw new DatabaseError();
        }
    };

    getWinCriterion = (gameMode) => {

        let winCriterion = null;

        GameController.GAME_MODES.map(gameModeClass => {
            if (gameModeClass.CLASSNAME === gameMode) {
                winCriterion = gameModeClass.WIN_CRITERION;
            }
        });

        if (!winCriterion) throw new GameModeNotFoundError();

        return winCriterion;
    };

}

module.exports = GameController;
