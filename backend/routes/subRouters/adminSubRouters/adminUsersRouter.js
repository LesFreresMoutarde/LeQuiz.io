const adminUsersRouter = require('express').Router();


adminUsersRouter.route('/')
    .get((req, res) => {
        res.json({endpoint: 'GET admin/users'});
    })
    .post((req, res) => {
        res.json({endpoint: 'POST admin/users'})
    });


adminUsersRouter.route('/:id')
    .get((req, res) => {
        res.json({endpoint: `GET admin/users/${req.params.id}`});
    })
    .put((req, res) => {
        res.json({endpoint: `PUT admin/users/${req.params.id}`})
    })
    .patch((req, res) => {
        res.json({endpoint: `PATCH admin/users/${req.params.id}`})
    })
    .delete((req, res) => {
        res.json({endpoint: `DELETE admin/users/${req.params.id}`})
    });


module.exports = adminUsersRouter;