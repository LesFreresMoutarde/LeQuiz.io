const usersRouter = require('express').Router();
const UserController = require('../../controllers/UserController');


usersRouter.get('/guest-id', (req, res) => {
    const userController = new UserController();

    userController.actionGuestId();

    res.json(userController.response);
    res.status(userController.response)
});

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
