const authRouter = require('express').Router();
const AuthController = require('../../controllers/AuthController');


authRouter.get('/access-token', (req, res) => {
    const controller = new AuthController();

    let inputRefreshToken = null;
    if(req.query.refreshToken !== undefined) {
        inputRefreshToken = req.query.refreshToken;
    }

    controller.actionAccessToken(inputRefreshToken);

    res.status(controller.statusCode);
    res.send(controller.response);
});

authRouter.get('/verify-token', (req, res) => {
    const controller = new AuthController();
    controller.actionVerifyToken(req.headers.authorization);

    res.status(controller.statusCode);
    res.send(controller.response);
});

authRouter.post('/register', (req, res) => {
    res.json({endpoint: 'POST /auth/register'})
});

authRouter.post('/login', (req, res) => {
    const controller = new AuthController();
    controller.actionLogin(req.body);

    res.status(controller.statusCode);
    res.send(controller.response);
});

authRouter.post('/logout', (req, res) => {
    res.json({endpoint: 'POST /auth/logout'})
});


module.exports = authRouter;