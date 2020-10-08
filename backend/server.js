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
        let user = await db.User.create({
            username: 'totefo',
            email: 'email@dd.fr',
            password: 'boob',
            plan: 'prolo',
            role: 'vassal',
            isTrustyWriter: true,
            isActive: true,
            isBanned: false
        });
        let subscription = await db.Subscription.create({
            reference: 'tnb,n,bn,oto',
            userId: user.id,
            startDate: Sequelize.literal('CURRENT_DATE'),
            expirationDate: Sequelize.literal('CURRENT_DATE')
        });
        console.log('l user', user);
        console.log("la subscription", subscription);
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