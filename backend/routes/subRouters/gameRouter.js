const gameRouter = require('express').Router();
const GameController = require('../../controllers/GameController');

gameRouter.post('/modes', (req, res) => {
    const gameController = new GameController();

    gameController.actionModes(req.body.role);

    res.status(gameController.statusCode);
    res.json(gameController.response);
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