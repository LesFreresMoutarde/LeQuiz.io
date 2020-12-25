const gameRouter = require('express').Router();
const GameController = require('../../controllers/GameController');

gameRouter.post('/modes$', (req, res) => {
    const gameController = new GameController();

    gameController.actionModes(req.body.plan);

    res.status(gameController.statusCode);
    res.json(gameController.response);
});

gameRouter.get('/categories$', async (req, res) => {

    const gameController = new GameController();

    await gameController.actionCategories();

    res.status(gameController.statusCode);
    res.json(gameController.response);

});

gameRouter.post('/options$', async (req, res) => {

    const { gameMode, categories } = req.body;

    const gameController = new GameController();

    await gameController.actionOptions(gameMode, categories);

    res.status(gameController.statusCode);
    res.json(gameController.response);
});

gameRouter.route('/rooms$')
    .get((req, res) => {
        res.json({endpoint: 'GET /game/rooms'})
    })
    .post((req, res) => {
        res.json({endpoint: 'POST /game/rooms'})
    });

gameRouter.get('/rooms/:id(\\d+)', (req, res) => {
    res.json({endpoint: `GET /game/rooms/${req.params.id}`})
});

gameRouter.get('/generate/code', (req, res) => {

    const gameController = new GameController();

    gameController.actionGenerateRoomCode();

    res.status(gameController.statusCode);
    res.json(gameController.response);
});

gameRouter.get('/verify/rooms/:id(\\d+)', (req, res) => {
   // console.log(req.params.roomId);

    const gameController = new GameController();


    gameController.actionVerifyRoom(req.params.id);

    res.status(gameController.statusCode);
    res.json(gameController.response);
});

module.exports = gameRouter;
