const UserController = require("../../controllers/UserController");
const GameController = require("../../controllers/GameController");
const usersRouter = require('express').Router();

usersRouter.post('/contact', async (req, res, next) => {
    try {
        const controller = new UserController();

        await controller.actionContact(req.body);

        res.status(controller.statusCode);

        res.send(controller.response);
    } catch (error) {
        next(error);
    }
})

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
