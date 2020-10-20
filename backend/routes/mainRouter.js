// A voir
const mainRouter = require('express').Router();
const authRouter = require('./subRouters/authRouter');
const usersRouter = require('./subRouters/usersRouter');
const gameRouter = require('./subRouters/gameRouter');
module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/', usersRouter);
    app.use('/game', gameRouter);
};
