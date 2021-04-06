const settingsRouter = require('express').Router();
const SettingsController = require('../../controllers/SettingsController');

settingsRouter.get('/email', async (req, res, next) => {
    try {
        const controller = new SettingsController();

        await controller.actionGetEmail(req.accessTokenPayload);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

settingsRouter.patch('/email', async (req, res, next) => {
    try {
        const controller = new SettingsController();

        await controller.actionEditEmail(req.body, req.accessTokenPayload);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

settingsRouter.patch('/password', async (req, res, next) => {
    try {
        const controller = new SettingsController();

        await controller.actionEditPassword(req.body, req.accessTokenPayload);

        res.status(controller.statusCode);
        res.send(controller.response);
    } catch (error) {
        next(error);
    }
});

module.exports = settingsRouter;
