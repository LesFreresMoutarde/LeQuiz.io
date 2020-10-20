const mainRouter = require('express').Router();
const authRouter = require('./subRouters/authRouter');
const usersRouter = require('./subRouters/usersRouter');
const gameRouter = require('./subRouters/gameRouter');
const adminRouter = require('./subRouters/adminRouter');

mainRouter.use('/auth', authRouter);
mainRouter.use('/', usersRouter);
mainRouter.use('/game', gameRouter);
mainRouter.use('/admin', adminRouter);

module.exports = mainRouter;