const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 3000;

app.all('*', (req, res, next) => {
    console.log(req.method, req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
})

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("lequiz-io", "admin", "admin",{
    host: "database",
    dialect: "postgres"
});

const db = require('./models/dbModels');

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

/**
 * AUTH JWT - TODO ROUTER & FILES
 */

class InvalidTokenTypeError extends Error {}

const jwtSecret = 'superSecret'; // TODO config

const refreshTokens = []; // TODO store in database

/**
 * Verifies a JWT token, and optionnaly its type
 * @param token string
 * @param type string|string[] (optional) if set, the token must be of that type (accessToken, refreshToken)
 * @return {{
 *     verified: boolean
 *     payload: object
 *     error: string
 * }}
 */
const verifyToken = (token, type = null) => {
    const result = {};

    try {
        const payload = jwt.verify(token, jwtSecret);
        if(type !== null) { // Verify token type (accessToken/refreshToken)
            verifyTokenType(payload, type);
        }

        result.verified = true;
        result.payload = payload;
        return result;
    } catch(e) {
        result.verified = false;
        switch(e.constructor.name) {
            case 'JsonWebTokenError':
                result.error = 'Malformed token';
                break;
            case 'TokenExpiredError':
                result.error = 'Token has expired';
                break;
            case 'NotBeforeError':
                result.error = 'Token is not yet valid';
                break;
            case 'InvalidTokenTypeError':
                result.error = e.message;
                break;
            default:
                throw e;
        }

        return result;
    }
}

/**
 * Verifies the type contained in a JWT token payload
 * @param tokenPayload object
 * @param expectedType string|string[]
 * @throw InvalidTokenTypeError if token type does not match
 */
const verifyTokenType = (tokenPayload, expectedType) => {
    if(!tokenPayload.hasOwnProperty('type')) {
        throw new InvalidTokenTypeError('Token type not found in payload');
    }

    if(typeof expectedType === 'string') {
        expectedType = [expectedType];
    }

    if(!expectedType.includes(tokenPayload.type)) {
        throw new InvalidTokenTypeError(`Type ${tokenPayload.type} does not match any expected type (${expectedType.join(', ')})`);
    }
}

const generateToken = (type, initialPayload = {}) => {
    let expiresIn;
    switch(type) {
        case 'accessToken':
            expiresIn = 3;
            break;
        case 'refreshToken':
            expiresIn = 6;
            break;
        default:
            throw new InvalidTokenTypeError();
    }

    const payload = {...initialPayload};
    delete payload.iat;
    delete payload.exp;
    delete payload.type;

    payload.type = type;

    return jwt.sign(payload, jwtSecret, {
        expiresIn,
    });
}

const invalidateRefreshToken = (refreshToken) => {
    const index = refreshTokens.indexOf(refreshToken);
    if(index > -1) refreshTokens.splice(index, 1);
}

const saveRefreshToken = (refreshToken) => {
    refreshTokens.push(refreshToken);
}

app.get('/auth/verify-token', (req, res) => {
    const token = req.headers.authorization;
    res.status(200);
    const response = {
        valid: true,
    };
    const verification = verifyToken(token, ['accessToken', 'refreshToken']);
    if(verification.verified) {
        response.valid = true;
        response.type = verification.payload.type;
    } else {
        response.valid = false;
        response.error = verification.error;
    }

    res.send(response);
});

app.get('/auth/access-token', (req, res) => {
    let fromRefreshToken = false;
    if(req.query.refreshToken !== undefined) {
        fromRefreshToken = true;
    }

    if(fromRefreshToken) {
        const inputRefreshToken = req.query.refreshToken;
        const response = {};

        if(!refreshTokens.includes(inputRefreshToken)) {
            res.status(400);
            response.error = 'Unknown refresh token';
            res.send(response);
            return;
        }

        const verification = verifyToken(inputRefreshToken, 'refreshToken');
        if(!verification.verified) {
            response.error = verification.error
            res.status(400);
            res.send(response);
            return;
        }

        const refreshTokenPayload = verification.payload;

        newAccessToken = generateToken('accessToken', refreshTokenPayload);
        newRefreshToken = generateToken('refreshToken', refreshTokenPayload);

        invalidateRefreshToken(inputRefreshToken);
        saveRefreshToken(newRefreshToken);

        response.accessToken = newAccessToken;
        response.refreshToken = newRefreshToken;
        res.send(response);
        return;
    }

    const fakeUserId = Math.ceil(Math.random() * 10000);

    const accessToken = generateToken('accessToken', {userId: fakeUserId});
    const refreshToken = generateToken('refreshToken', {userId: fakeUserId});

    refreshTokens.push(refreshToken);

    res.send({
        'accessToken': accessToken,
        'refreshToken': refreshToken,
    })
})

app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`);
});