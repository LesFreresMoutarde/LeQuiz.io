const authRouter = require('express').Router();
const AuthController = require('../../controllers/AuthController');


authRouter.get('/access-token', async (req, res, next) => {
    try {
        const controller = new AuthController();

        let inputRefreshToken = null;
        if(req.query.refreshToken !== undefined) {
            inputRefreshToken = req.query.refreshToken;
        }

        await controller.actionAccessToken(inputRefreshToken);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

authRouter.get('/verify-token', (req, res, next) => {
    try {
        const controller = new AuthController();
        controller.actionVerifyToken();

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

authRouter.post('/register', async (req, res, next) => {
    try {
        const controller = new AuthController();
        await controller.actionRegister(req.body, req.accessTokenPayload);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

authRouter.post('/login', async (req, res, next) => {
    try {
        const controller = new AuthController();
        await controller.actionLogin(req.body, req.accessTokenPayload);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

authRouter.post('/logout', async (req, res, next) => {
    try {
        const controller = new AuthController();
        await controller.actionLogout(req.accessTokenPayload);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

authRouter.post('/forgot-password', async (req, res, next) => {
    try {
        const controller = new AuthController();
        await controller.actionForgotPassword(req.body);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

authRouter.get('/reset-password', async (req, res, next) => {
    try {
        const controller = new AuthController();
        await controller.actionPasswordResetTokenExists(req.query);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

authRouter.post('/reset-password', async (req, res, next) => {
    try {
        const controller = new AuthController();
        await controller.actionResetPassword(req.body);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});


module.exports = authRouter;
