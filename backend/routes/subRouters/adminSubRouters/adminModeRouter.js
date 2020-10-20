const adminModesRouter = require('express').Router();


adminModesRouter.route('/')
    .get((req, res) => {
        res.json({endpoint: 'GET admin/modes'});
    })
    .post((req, res) => {
        res.json({endpoint: 'POST admin/modes'})
    });


adminModesRouter.route('/:name')
    .get((req, res) => {
        res.json({endpoint: `GET admin/modes/${req.params.name}`});
    })
    .put((req, res) => {
        res.json({endpoint: `PUT admin/modes/${req.params.name}`})
    })
    .patch((req, res) => {
        res.json({endpoint: `PATCH admin/modes/${req.params.name}`})
    })
    .delete((req, res) => {
        res.json({endpoint: `DELETE admin/modes/${req.params.name}`})
    });


module.exports = adminModesRouter;