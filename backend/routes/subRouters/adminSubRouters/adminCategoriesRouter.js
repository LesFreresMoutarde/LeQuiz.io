const adminCategoriesRouter = require('express').Router();


adminCategoriesRouter.route('/')
    .get((req, res) => {
        res.json({endpoint: 'GET admin/categories'});
    })
    .post((req, res) => {
        res.json({endpoint: 'POST admin/categories'})
    });


adminCategoriesRouter.route('/:id([\\w\\-]+)')
    .get((req, res) => {
        res.json({endpoint: `GET admin/categories/${req.params.name}`});
    })
    .put((req, res) => {
        res.json({endpoint: `PUT admin/categories/${req.params.name}`})
    })
    .patch((req, res) => {
        res.json({endpoint: `PATCH admin/categories/${req.params.name}`})
    })
    .delete((req, res) => {
        res.json({endpoint: `DELETE admin/categories/${req.params.name}`})
    });


module.exports = adminCategoriesRouter;
