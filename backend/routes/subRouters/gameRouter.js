const gameRouter = require('express').Router();
const GameController = require('../../controllers/GameController');

gameRouter.post('/modes', (req, res) => {
    console.log("la requete", req.body);
    //GameController
    res.json({endpoint: 'POST /game/modes'});
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