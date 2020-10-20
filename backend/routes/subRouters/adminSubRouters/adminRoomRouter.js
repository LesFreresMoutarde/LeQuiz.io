const adminRoomRouter = require('express').Router();


adminRoomRouter.get('/', (req, res) => {
    res.json({endpoint: 'GET admin/rooms'});
});

adminRoomRouter.route('/:id')
    .get((req, res) => {
        res.json({endpoint: `GET admin/rooms/${req.params.id}`});
    })
    .delete((req, res) => {
        res.json({endpoint: `DELETE admin/rooms/${req.params.id}`})
    });


module.exports = adminRoomRouter;