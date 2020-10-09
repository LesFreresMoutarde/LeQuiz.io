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
    try {
        // Faire une transaction quand tous les modèles seront init
        let user = await db.User.create({
            username: 'toto',
            email: 'email@dd.fr',
            password: 'boob',
            plan: 'prolo',
            role: 'vassal',
            isTrustyWriter: true,
            isActive: true,
            isBanned: false
        });
        let subscription = await db.Subscription.create({
            reference: 'ref',
            userId: user.id,
            startDate: Sequelize.literal('CURRENT_DATE'),
            expirationDate: Sequelize.literal('CURRENT_DATE')
        });
        let category = await db.Category.create({
            name: 'Questions sur la reproduction des Limaces du Gers'
        });
        let customQuiz = await db.CustomQuiz.create({
            title: 'Qui est le boss ?',
            authorId: user.id,
            reviewsRequested: true,
            status: 'approved',
        });
        await customQuiz.addCategory(category);
        let userReview = await db.UserReview.create({
            reviewerId: user.id,
            customQuizId: customQuiz.id,
            status: 'positive',
            comment: 'Really interesting quiz'
        });
        //console.log('fetchedfoo', fetchedFoo.toJSON());
        console.log('l user', user.toJSON());
        console.log("la subscription", subscription.toJSON());
        console.log("la categorie", category.toJSON());
        console.log('le custom quiz', customQuiz.toJSON());
        console.log('la categorie du custom quiz', await customQuiz.getCategories());
        console.log('les subs de l user', await user.getSubscriptions());
        console.log('la user review', userReview.toJSON());
    } catch (error) {
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