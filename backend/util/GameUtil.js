const RandomUtil = require("./RandomUtil");

class GameUtil {

    static ROUND_TIME = 12*1000*100;
    static SCORES_TIME = 5*1000;

    static HARDCORE_DIFFICULTY = 'hardcore';

    static generateQuizQuery = (gameConfiguration) => {
        let query = ''
        let hardcoreQuestionCount = 0;

        if (gameConfiguration.withHardcoreQuestions) {
            hardcoreQuestionCount = GameUtil.getHardcoreQuestionCountForQuery(gameConfiguration);
        }

        switch (gameConfiguration.gameMode.classname) {
            case 'Serie':
                query = GameUtil.generateSerieQuizQuery(gameConfiguration, hardcoreQuestionCount);
                break;

            case 'Ascension':
                break;

            case 'Blitz':
                break;

            case 'Survivant':
                break;
        }

        return query;

    };

    static generateSerieQuizQuery = (gameConfiguration, hardcoreQuestionCount) => {

        const questionTypesId = gameConfiguration.questionTypes.map(questionType => questionType.id);
        const categoriesId = gameConfiguration.categories.map(category => category.id);

        //TODO Prendre les infos pertinentes concernant les catégories et les types
        // Revenir dessus quand edit de question (back office) fonctionnel
        if (hardcoreQuestionCount === 0) {
            const standardLimit = Number(gameConfiguration.winCriterion);
            return {
                query:`SELECT "question"."content", "question"."answer", "question"."media", 
                    "question_type"."label" as "typeLabel", "question_type"."name" as "type", 
                    "category"."name" as "category", "category"."label" as "categoryLabel"
                    FROM "question"
                    INNER JOIN "category_question" ON "question"."id" = "category_question"."questionId"
                    INNER JOIN "category" ON "category_question"."categoryId" = "category"."id"
                    INNER JOIN "question_type_question" ON "question_type_question"."questionId" = "question"."id"
                    INNER JOIN "question_type" ON "question_type"."id" = "question_type_question"."questionTypeId" 
                    WHERE "question"."status" = 'approved' AND "question_type"."id" IN (:questionTypes)
                    AND "question"."isHardcore" = false
                    AND "category_question"."categoryId" IN (:categories) 
                    ORDER BY random() LIMIT :limit;`
                ,
                options: {
                    replacements: {
                        questionTypes: questionTypesId,
                        categories: categoriesId,
                        limit: standardLimit,

                    },
                    type: db.sequelize.QueryTypes.SELECT
                }
            };
        } else {
            const standardLimit = Number(gameConfiguration.winCriterion) - hardcoreQuestionCount;
            return {
                query:`(SELECT "question"."content", "question"."answer", "question"."media", 
                    "question_type"."label" as "typeLabel", "question_type"."name" as "type", 
                    "category"."name" as "category", "category"."label" as "categoryLabel"
                    FROM "question"
                    INNER JOIN "category_question" ON "question"."id" = "category_question"."questionId"
                    INNER JOIN "category" ON "category_question"."categoryId" = "category"."id"
                    INNER JOIN "question_type_question" ON "question_type_question"."questionId" = "question"."id"
                    INNER JOIN "question_type" ON "question_type"."id" = "question_type_question"."questionTypeId" 
                    WHERE "question"."status" = 'approved' AND "question_type"."id" IN (:questionTypes)
                    AND "question"."isHardcore" = false
                    AND "category_question"."categoryId" IN (:categories) 
                    ORDER BY random() LIMIT :standardLimit)
                    UNION
                    (SELECT "question"."content", "question"."answer", "question"."media", 
                    "question_type"."label" as "typeLabel", "question_type"."name" as "type", 
                    "category"."name" as "category", "category"."label" as "categoryLabel"
                    FROM "question"
                    INNER JOIN "category_question" ON "question"."id" = "category_question"."questionId"
                    INNER JOIN "category" ON "category_question"."categoryId" = "category"."id"
                    INNER JOIN "question_type_question" ON "question_type_question"."questionId" = "question"."id"
                    INNER JOIN "question_type" ON "question_type"."id" = "question_type_question"."questionTypeId" 
                    WHERE "question"."status" = 'approved' AND "question_type"."id" IN (:questionTypes)
                    AND "question"."isHardcore" = true
                    AND "category_question"."categoryId" IN (:categories) 
                    ORDER BY random() LIMIT :hardcoreLimit); `
                ,
                options: {
                    replacements: {
                        questionTypes: questionTypesId,
                        categories: categoriesId,
                        standardLimit: standardLimit,
                        hardcoreLimit: hardcoreQuestionCount
                    },
                    type: db.sequelize.QueryTypes.SELECT
                }
            };
        }
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

    static executeQuizQuery = async (queryObject) => {
        const quiz =  await db.sequelize.query(queryObject.query, queryObject.options);

        quiz.forEach((question, index) => {
            question.round = index+1;
        });

        return quiz;
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

        let hardcoreQuestionCount = 0
        let standardQuestionCount = 0

        questionCountPerCategory.forEach((questionCountForOneCategory) => {
            Object.values(questionCountForOneCategory).forEach(questionCountPerType => {
                for (const [difficulty, countPerDifficulty] of Object.entries(questionCountPerType)) {
                    if (difficulty === GameUtil.HARDCORE_DIFFICULTY ) {
                        hardcoreQuestionCount += countPerDifficulty;
                        break;
                    }
                    standardQuestionCount += countPerDifficulty;
                }
            })
        })

        return {hardcoreQuestionCount, standardQuestionCount};
    }

}

module.exports = GameUtil;
