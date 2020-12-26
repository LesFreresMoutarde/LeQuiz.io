const adminQuestionTypesRouter = require('express').Router();


adminQuestionTypesRouter.route('/')
    .get((req, res) => {
        res.json({endpoint: 'GET admin/question-types'});
    })


adminQuestionTypesRouter.route('/:name([a-zA-Z\\-]+)')
    .get((req, res) => {
        res.json({endpoint: `GET admin/question-types/${req.params.name}`});
    })


module.exports = adminQuestionTypesRouter;
