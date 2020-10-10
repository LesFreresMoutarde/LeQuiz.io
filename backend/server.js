const express = require('express');
const app = express();
const port = 3000;

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("lequiz-io", "admin", "admin",{
    host: "database",
    dialect: "postgres"
});

const db = require('./models/db_models');

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection is Good");

    } catch (error) {
        console.error('Unable to connect : ', error);
    }
})();

testModel = async () => {
    // J'initialise une transaction. Cet variable sera passé à chaque requete
    const transaction = await sequelize.transaction();
    try {

        // Création d'un User et d'une Subscription associé
        let user = await db.User.create({
            username: 'toto',
            email: 'toto@toto.fr',
            password: 'bobo',
            plan: 'gratuit',
            role: 'membre',
            isTrustyWriter: false,
            isActive: true,
            isBanned: false,
            subscriptions: [
                {
                    reference: 'ref0213',
                    startDate: Sequelize.literal('CURRENT_DATE'),
                    expirationDate: Sequelize.literal('CURRENT_DATE')
                }
            ]
        }, {
            include: [{
                model: db.Subscription,
                as: 'subscriptions'
            }],
            transaction
        });

        // Création d'une catégorie
        let category = await db.Category.create({
            name: 'Histoire'
        }, {transaction});

        // Création d'un CustomQuiz avec renseignement l'auteur par la foreignKey
        let customQuiz = await db.CustomQuiz.create({
            title: 'Les dates du XXème siècle',
            authorId: user.id,
            reviewsRequested: true,
            status: 'approved',
        }, {transaction});

        // Ajout d'une Category au CustomQuiz
        await customQuiz.addCategory(category, {transaction});

        // Création d'un Question et de sa QuestionPosition
        let question = await db.Question.create({
            type: 'qcm',
            content: 'De quelle année date cette photo ?',
            answer: {
                answers: [
                    {
                        is_good_answer: false,
                        content: '1975',
                    },
                    {
                        is_good_answer: true,
                        content: '1914'
                    }
                    // ...
                ],
                additional: {
                    media: 'filesystem/answers/3641313.jpg',
                    info: 'La toute fin de l\'empire Ottoman'
                }
            },
            status: 'approved',
            media: {
                extension: 'jpg',
                url: 'filesystem/question/6541463545.jpg'
            },
            customQuizId: customQuiz.id,
            customQuizQuestionPosition: {
            position: 11
            }
        },{
            include: [{
                model: db.QuestionPosition, as:
                    'customQuizQuestionPosition'
            }],
            transaction
        });

        // Ajout d'une catégorie à la question
        await question.addCategories([category], {transaction});

        // Ajout d'un CustomQuiz et d'un User et d'une Category et d'une Question avec sa QuestionPosition
        let customQuiz2 = await db.CustomQuiz.create({
            title: 'Les vainqueurs du 100m',
            author: {
                username: "JackieJo",
                email: "jackiejo@jjsss.fr",
                password: "mot de passe",
                plan: "premium",
                role: 'rewriter',
                isTrustyWriter: true,
                isActive: true,
                isBanned: false
            },
            categories: [
                {
                    name: "Sport"
                }
            ],
            questions: [{
                type: 'input',
                content: 'Qui a le record mondial du 100m ?',
                answer: {
                    answers: [
                        {
                            is_good_answer: true,
                            content: 'Usain Bolt',
                        },
                        {
                            is_good_answer: true,
                            content: 'Bolt'
                        }
                    ],
                    additional: {
                        info: 'Berlin 2009'
                    },
                },
                customQuizQuestionPosition: {
                    position: 10
                },
                status: 'approved',
            }],
            reviewsRequested: true,
            status: 'approved',
        }, {
            include: [
                {
                    model: db.User,
                    as: 'author',
                },
                {
                    model: db.Question,
                    as: 'questions',
                    include : [{
                        model: db.QuestionPosition,
                        as: 'customQuizQuestionPosition'
                    }]
                },
                {
                    model: db.Category,
                    as: 'categories'
                }
            ],
            transaction
        });

        // Commit de la transaction
        await transaction.commit();

        // Requete Select sur tous les CustomQuiz en incluant leur questions, auteur et catégories
        let res = await db.CustomQuiz.findAll({
            include: [
                {
                    model: db.Question,
                    as: 'questions',
                    include: [{
                        model: db.QuestionPosition,
                        as: 'customQuizQuestionPosition'
                    }]
                },
                {
                    model: db.User,
                    as: 'author'
                },
                {
                    model: db.Category,
                    as: 'categories'
                }
            ]
        });
        res.map((result) => console.log(result.toJSON()));
        console.log("la souscription de l'utilisateur", await user.getSubscriptions());
    } catch (error) {
        // Rollback si erreur
        await transaction.rollback();
        console.error(error);
    }
};


app.get('/', async (req, res) => {
    await testModel();
    res.statusCode = 200;
    res.send('lequiz.io-backend container');
});

app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`);
});