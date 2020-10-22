const adminRouter = require('express').Router();
const adminUsersRouter = require('./adminSubRouters/adminUsersRouter');
const adminRoomRouter = require('./adminSubRouters/adminRoomRouter');
const adminModesRouter = require('./adminSubRouters/adminModeRouter');
const adminQuestionsRouter = require('./adminSubRouters/adminQuestionsRouter');
const adminQuestionTypesRouter = require('./adminSubRouters/adminQuestionTypesRouter');
const adminCategoriesRouter = require('./adminSubRouters/adminCategoriesRouter');

adminRouter.use('/users', adminUsersRouter);
adminRouter.use('/rooms', adminRoomRouter);
adminRouter.use('/modes', adminModesRouter);
adminRouter.use('/questions', adminQuestionsRouter);
adminRouter.use('/questions-types', adminQuestionTypesRouter);
adminRouter.use('/categories', adminCategoriesRouter);

module.exports = adminRouter;