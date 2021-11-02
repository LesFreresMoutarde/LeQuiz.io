const RandomUtil = require("./RandomUtil");

class GameUtil {

    static ROUND_TIME = 12*1000;
    static SCORES_TIME = 5*1000*100;

    static HARDCORE_DIFFICULTY = 'hardcore';

    static generateQuiz = async (gameConfiguration) => {
        let questions = null
        let questionsCategories = null;
        let quiz = null;
        let hardcoreQuestionCount = 0;

        if (gameConfiguration.withHardcoreQuestions) {
            hardcoreQuestionCount = GameUtil.getHardcoreQuestionCountForQuery(gameConfiguration);
        }

        switch (gameConfiguration.gameMode.classname) {
            case 'Serie':
                questions = await GameUtil.generateQuestions(gameConfiguration, hardcoreQuestionCount);
                questionsCategories = await GameUtil.getCategoriesFromGeneratedQuestions(questions);
                quiz = GameUtil.mergeQuestionsAndCategories(questions, questionsCategories);
                break;

            case 'Ascension':
                break;

            case 'Blitz':
                break;

            case 'Survivant':
                break;
        }

        return quiz;

    };

    static generateQuestions = async (gameConfiguration, hardcoreQuestionCount) => {
        let queryObject;
        const questionTypesId = gameConfiguration.questionTypes.map(questionType => questionType.id);
        const categoriesId = gameConfiguration.categories.map(category => category.id);

        //TODO Prendre les infos pertinentes concernant les catégories et les types
        // Revenir dessus quand edit de question (back office) fonctionnel
        if (hardcoreQuestionCount === 0) {
            const standardLimit = Number(gameConfiguration.winCriterion);
            queryObject = {
                query:`SELECT * FROM (
                    (SELECT * FROM (SELECT DISTINCT "question"."id", "question"."isHardcore", "question"."content", "question"."answer", "question"."media",
                    "question_type"."label" as "typeLabel", "question_type"."name" as "type"
                    FROM "question"
                    INNER JOIN "category_question" ON "question"."id" = "category_question"."questionId"
                    INNER JOIN "question_type_question" ON "question_type_question"."questionId" = "question"."id"
                    INNER JOIN "question_type" ON "question_type"."id" = "question_type_question"."questionTypeId"
                    WHERE "question"."status" = :status AND "question_type"."id" IN (:questionTypes)
                    AND "question"."isHardcore" = false
                    AND "category_question"."categoryId" IN (:categories)
                    ) distinct_part
                    ORDER BY random()
                    LIMIT :limit)) random_part;`
                ,
                options: {
                    replacements: {
                        questionTypes: questionTypesId,
                        categories: categoriesId,
                        limit: standardLimit,
                        status: db.Question.STATUS_APPROVED
                    },
                    type: db.sequelize.QueryTypes.SELECT
                }
            };
        } else {
            const standardLimit = Number(gameConfiguration.winCriterion) - hardcoreQuestionCount;
            queryObject = {
                query:`SELECT * FROM (
                    (SELECT * FROM (SELECT DISTINCT "question"."id", "question"."isHardcore", "question"."content", "question"."answer", "question"."media",
                    "question_type"."label" as "typeLabel", "question_type"."name" as "type"
                    FROM "question"
                    INNER JOIN "category_question" ON "question"."id" = "category_question"."questionId"
                    INNER JOIN "question_type_question" ON "question_type_question"."questionId" = "question"."id"
                    INNER JOIN "question_type" ON "question_type"."id" = "question_type_question"."questionTypeId"
                    WHERE "question"."status" = :status AND "question_type"."id" IN (:questionTypes)
                    AND "question"."isHardcore" = false
                    AND "category_question"."categoryId" IN (:categories)
                    ) standard
                    ORDER BY random()
                    LIMIT :standardLimit)
                    UNION
                    (SELECT * FROM (SELECT DISTINCT "question"."id", "question"."isHardcore", "question"."content", "question"."answer", "question"."media",
                    "question_type"."label" as "typeLabel", "question_type"."name" as "type"
                    FROM "question"
                    INNER JOIN "category_question" ON "question"."id" = "category_question"."questionId"
                    INNER JOIN "question_type_question" ON "question_type_question"."questionId" = "question"."id"
                    INNER JOIN "question_type" ON "question_type"."id" = "question_type_question"."questionTypeId"
                    WHERE "question"."status" = :status AND "question_type"."id" IN (:questionTypes)
                    AND "question"."isHardcore" = true
                    AND "category_question"."categoryId" IN (:categories)
                    ) hardcore
                    ORDER BY random()
                    LIMIT :hardcoreLimit)) total
                    ORDER BY random();`
                ,
                options: {
                    replacements: {
                        questionTypes: questionTypesId,
                        categories: categoriesId,
                        standardLimit: standardLimit,
                        hardcoreLimit: hardcoreQuestionCount,
                        status: db.Question.STATUS_APPROVED
                    },
                    type: db.sequelize.QueryTypes.SELECT
                }
            };
        }

        const questions = await db.sequelize.query(queryObject.query, queryObject.options)

        questions.forEach((question, index) => {
            question.round = index+1;
        })

        return questions;

        //TODO V2
        /*let categoriesAndItsQuestionsNb = [];
        const nbQuestionsPerCategory = Math.floor(
            Number(gameConfiguration.winCriterion / gameConfiguration.categories.length)
        );
        let categoryRemainder = gameConfiguration.winCriterion % gameConfiguration.categories.length;

        gameConfiguration.categories.forEach((category) => {
            let total = 0;
            for (const questionType in category.nbQuestions)  {
                total += Number(category['nbQuestions'][questionType]);
                category['nbQuestions'][questionType] = Number(category['nbQuestions'][questionType]);
            }
            category['nbQuestions']['total'] = total;
            // Determiner 1er reste si nécessaire
        });

        console.log('gameConfig avec les totaux', gameConfiguration.categories)
        if (categoryRemainder > 0) {
            while (categoryRemainder !== 0) {
                gameConfiguration.categories.forEach((category) => {

                })
            }
        }*/
    };

    static getCategoriesFromGeneratedQuestions = async (questions) => {
        const questionsId = questions.map(question => question.id);

        const queryObject = {
            query: `SELECT "cq"."questionId", "c"."label"
                FROM "category_question" cq
                INNER JOIN "category" c ON "c"."id" = "cq"."categoryId"
                WHERE "cq"."questionId" IN (:questions)`,
            options: {
                replacements: {
                    questions: questionsId
                },
                type: db.sequelize.QueryTypes.SELECT
            }
        }

        return await db.sequelize.query(queryObject.query, queryObject.options);
    }

    static mergeQuestionsAndCategories = (questions, categories) => {
        const categoriesPerQuestion = {};

        categories.forEach(category => {
            if (!categoriesPerQuestion[category.questionId]) {
                categoriesPerQuestion[category.questionId] = [category.label]
                return;
            }

            categoriesPerQuestion[category.questionId].push(category.label);
        })

        questions.forEach(question => {
            question.categories = categoriesPerQuestion[question.id];
        })

        return questions
    }

    static getHardcoreQuestionCountForQuery = (gameConfiguration) => {
        const minPercentage = 20;
        const percentagesPossible = [];

        const {hardcoreQuestionCount, standardQuestionCount} = GameUtil.getQuestionCountPerDifficulty(gameConfiguration);

        if (hardcoreQuestionCount + standardQuestionCount === gameConfiguration.winCriterion) return hardcoreQuestionCount;

        const hardcoreQuestionPercentage = (hardcoreQuestionCount * 100) / gameConfiguration.winCriterion;

        const hardcoreQuestionPercentageRounded = (parseInt(hardcoreQuestionPercentage / 10, 10)) * 10

        if (hardcoreQuestionPercentageRounded <= minPercentage) return hardcoreQuestionCount;

        for (let i = minPercentage; i <= hardcoreQuestionPercentageRounded; i+=10) {
            percentagesPossible.push(i);
        }

        const randomPercentage = percentagesPossible[RandomUtil.getRandomInt(percentagesPossible.length)];

        return parseInt((randomPercentage * gameConfiguration.winCriterion) / 100);
    }

    static getQuestionCountPerDifficulty = (gameConfiguration) => {
        const questionCountPerCategory = gameConfiguration.categories.map(category => category.nbQuestions);
        const questionCountPerCategoryCouple = gameConfiguration.categoriesCouple.map(couple => couple.nbQuestions);

        let hardcoreQuestionCount = 0;
        let standardQuestionCount = 0;

        let hardcoreCategoriesCoupleQuestionCount = 0;
        let standardCategoriesCoupleQuestionCount = 0;

        questionCountPerCategory.forEach((categoryQuestionCount) => {
            const questionCounts = GameUtil.getQuestionCountTotalThroughCategory(categoryQuestionCount);
            standardQuestionCount += questionCounts.standardQuestionCount;
            hardcoreQuestionCount += questionCounts.hardcoreQuestionCount;
        })

        questionCountPerCategoryCouple.forEach(categoryCoupleQuestionType => {
            const questionCounts = GameUtil.getQuestionCountTotalThroughCategory(categoryCoupleQuestionType)
            hardcoreCategoriesCoupleQuestionCount += questionCounts.hardcoreQuestionCount;
            standardCategoriesCoupleQuestionCount += questionCounts.standardQuestionCount;
        })

        console.log("classic", standardQuestionCount, hardcoreQuestionCount);
        console.log("couple", standardCategoriesCoupleQuestionCount, hardcoreCategoriesCoupleQuestionCount);

        hardcoreQuestionCount -= hardcoreCategoriesCoupleQuestionCount;
        standardQuestionCount -= standardCategoriesCoupleQuestionCount;

        return {hardcoreQuestionCount, standardQuestionCount};
    }

    static getQuestionCountTotalThroughCategory = (categoryQuestionCount) => {
        let hardcoreQuestionCount = 0
        let standardQuestionCount = 0

        Object.values(categoryQuestionCount).forEach(questionCountPerType => {
            for (const [difficulty, countPerDifficulty] of Object.entries(questionCountPerType)) {
                if (difficulty === GameUtil.HARDCORE_DIFFICULTY ) {
                    hardcoreQuestionCount += countPerDifficulty;
                    break;
                }
                standardQuestionCount += countPerDifficulty;
            }
        })

        return {hardcoreQuestionCount, standardQuestionCount};
    }

}

module.exports = GameUtil;
