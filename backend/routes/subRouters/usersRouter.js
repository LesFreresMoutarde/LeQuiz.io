const usersRouter = require('express').Router();

usersRouter.route('/:id([\\w\\-]+)')
    .get((req, res) => {
        res.json({endpoint: `GET /users/${req.params.id}`})
    })
    .put((req, res) => {
        res.json({endpoint: `PUT /users/${req.params.id}`})
    })
    .patch((req, res) => {
        res.json({endpoint: `PATCH /users/${req.params.id}`})
    })
    .delete((req, res) => {
        res.json({endpoint: `DELETE /users/${req.params.id}`})
    });

module.exports = usersRouter;
