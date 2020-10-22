const adminQuestionsRouter = require('express').Router();


adminQuestionsRouter.route('/')
    .get((req, res) => {
        res.json({endpoint: 'GET admin/questions'});
    })
    .post((req, res) => {
        res.json({endpoint: 'POST admin/questions'})
    });


adminQuestionsRouter.route('/:id')
    .get((req, res) => {
        res.json({endpoint: `GET admin/questions/${req.params.id}`});
    })
    .put((req, res) => {
        res.json({endpoint: `PUT admin/questions/${req.params.id}`})
    })
    .patch((req, res) => {
        res.json({endpoint: `PATCH admin/questions/${req.params.id}`})
    })
    .delete((req, res) => {
        res.json({endpoint: `DELETE admin/questions/${req.params.id}`})
    });


module.exports = adminQuestionsRouter;