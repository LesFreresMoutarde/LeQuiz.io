const mainRouter = require('express').Router();
const authRouter = require('./subRouters/authRouter');
const usersRouter = require('./subRouters/usersRouter');
const gameRouter = require('./subRouters/gameRouter');
const adminRouter = require('./subRouters/adminRouter');
const settingsRouter = require('./subRouters/settingsRouter');

mainRouter.use('^/auth', authRouter);
mainRouter.use('^/users', usersRouter);
mainRouter.use('/game', gameRouter);
mainRouter.use('/admin', adminRouter);
mainRouter.use('/settings', settingsRouter);

module.exports = mainRouter;
