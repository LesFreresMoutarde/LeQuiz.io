const gameRouter = require('express').Router();


gameRouter.get('/modes', (req, res) => {
    res.json({endpoint: 'GET /game/modes'});
});

gameRouter.get('/categories', (req, res) => {
    res.json({endpoint: 'GET /game/categories'})
});

gameRouter.get('/options', (req, res) => {
    res.json({endpoint: 'GET /game/options'})
});

gameRouter.route('/rooms')
    .get((req, res) => {
        res.json({endpoint: 'GET /game/rooms'})
    })
    .post((req, res) => {
        res.json({endpoint: 'POST /game/rooms'})
    });

gameRouter.get('/rooms/:id', (req, res) => {
    res.json({endpoint: `GET /game/rooms/${req.params.id}`})
});

module.exports = gameRouter;