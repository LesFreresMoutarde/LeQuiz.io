const authRouter = require('express').Router();
const AuthController = require('../../controllers/AuthController');


authRouter.get('/access-token', async (req, res) => {
    const controller = new AuthController();

    let inputRefreshToken = null;
    if(req.query.refreshToken !== undefined) {
        inputRefreshToken = req.query.refreshToken;
    }

    await controller.actionAccessToken(inputRefreshToken);

    res.status(controller.statusCode);
    res.send(controller.response);
});

authRouter.get('/verify-token', (req, res) => {
    const controller = new AuthController();
    controller.actionVerifyToken();

    res.status(controller.statusCode);
    res.send(controller.response);
});

authRouter.post('/register', (req, res) => {
    res.json({endpoint: 'POST /auth/register'})
});

authRouter.post('/login', async (req, res) => {
    const controller = new AuthController();
    await controller.actionLogin(req.body, req.accessTokenPayload);

    res.status(controller.statusCode);
    res.send(controller.response);
});

authRouter.post('/logout', async (req, res) => {
    const controller = new AuthController();
    await controller.actionLogout(req.accessTokenPayload);

    res.status(controller.statusCode);
    res.send(controller.response);
});

authRouter.post('/forgot-password', async (req, res) => {
    const controller = new AuthController();
    await controller.actionForgotPassword(req.body);

    res.status(controller.statusCode);
    res.send(controller.response);
});

authRouter.get('/reset-password', async (req, res) => {
    const controller = new AuthController();
    await controller.actionPasswordResetTokenExists(req.query);

    res.status(controller.statusCode);
    res.send(controller.response);
});

authRouter.post('/reset-password', async (req, res) => {
    const controller = new AuthController();
    await controller.actionResetPassword(req.body);

    res.status(controller.statusCode);
    res.send(controller.response);
});


module.exports = authRouter;
