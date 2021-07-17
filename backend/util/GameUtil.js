
class GameUtil {

    static ROUND_TIME = 12*1000;
    static SCORES_TIME = 5*1000;

    static HARDCORE_DIFFICULTY = 'hardcore';

    static generateQuizQuery = (gameConfiguration) => {
        let query = ''
        let hardcoreQuestionsPercentage = 0;

        if (gameConfiguration.withHardcoreQuestions) {
            GameUtil.getHardcoreQuestionsPercentageInQuiz(gameConfiguration)
        }

        switch (gameConfiguration.gameMode.classname) {
            case 'Serie':
                query = GameUtil.generateSerieQuizQuery(gameConfiguration);
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

    static generateSerieQuizQuery = (gameConfiguration) => {

        const questionTypesId = gameConfiguration.questionTypes.map(questionType => questionType.id);
        const categoriesId = gameConfiguration.categories.map(category => category.id);
        const limit = Number(gameConfiguration.winCriterion);

        //TODO Prendre les infos pertinentes concernant les catégories et les types
        // Revenir dessus quand edit de question (back office) fonctionnel
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
                AND "category_question"."categoryId" IN (:categories) 
                ORDER BY random() LIMIT :limit;`
            ,
            options: {
                replacements: {
                    questionTypes: questionTypesId,
                    categories: categoriesId,
                    limit,

                },
                type: db.sequelize.QueryTypes.SELECT
            }
        };

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

    static getHardcoreQuestionsPercentageInQuiz = (gameConfiguration) => {
        const hardcoreQuestionCount = GameUtil.getHardcoreQuestionCount(gameConfiguration);
        console.log("nb hardcore question",hardcoreQuestionCount);
    }

    static getHardcoreQuestionCount = (gameConfiguration) => {
        const questionCountPerCategory = gameConfiguration.categories.map(category => category.nbQuestions);

        let hardcoreQuestionCount = 0

        questionCountPerCategory.forEach((questionCountForOneCategory) => {
            Object.values(questionCountForOneCategory).forEach(questionCountPerType => {
                for (const [difficulty, countPerDifficulty] of Object.entries(questionCountPerType)) {
                    if (difficulty === GameUtil.HARDCORE_DIFFICULTY ) {
                        hardcoreQuestionCount += countPerDifficulty;
                    }
                }
            })
        })

        return hardcoreQuestionCount;
    }

}

module.exports = GameUtil;
