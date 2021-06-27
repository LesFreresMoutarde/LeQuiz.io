const gameRouter = require('express').Router();
const GameController = require('../../controllers/GameController');

gameRouter.post('/modes', (req, res, next) => {
    try {
        const gameController = new GameController();

        gameController.actionModes(req.body.plan);

        res.status(gameController.statusCode);
        res.json(gameController.response);
    } catch (error) {
        console.log("catch block from gameRouter", error)
        next(error);
    }
});

gameRouter.get('/categories', async (req, res, next) => {
    try {
        const gameController = new GameController();

        await gameController.actionCategories();

        res.status(gameController.statusCode);
        res.json(gameController.response);
    } catch (error) {
        next(error);
    }
});

gameRouter.post('/options', async (req, res, next) => {
    try {
        const { gameMode, categories } = req.body;

        const gameController = new GameController();

        await gameController.actionOptions(gameMode, categories);

        res.status(gameController.statusCode);
        res.json(gameController.response);
    } catch (error) {
        next(error);
    }
});

gameRouter.route('/rooms')
    .get((req, res) => {
        res.json({endpoint: 'GET /game/rooms'})
    })
    .post((req, res) => {
        res.json({endpoint: 'POST /game/rooms'})
    });

gameRouter.get('/rooms/create', (req, res, next) => {
    try {
        const gameController = new GameController();

        gameController.actionCreateRoom();

        res.status(gameController.statusCode);
        res.json(gameController.response);
    } catch (error) {
        next(error);
    }
});

gameRouter.get('/rooms/:id(\\w+)', (req, res) => {
    res.json({endpoint: `GET /game/rooms/${req.params.id}`})
});

gameRouter.get('/rooms/verify/:id(\\w+)', (req, res, next) => {
    try {
        const gameController = new GameController();

        gameController.actionVerifyRoom(req.params.id);

        res.status(gameController.statusCode);
        res.json(gameController.response);
    } catch (error) {
        next(error);
    }
});

module.exports = gameRouter;
