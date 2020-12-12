const settingsRouter = require('express').Router();
const SettingsController = require('../../controllers/SettingsController');

settingsRouter.get('/email', async (req, res) => {
    const controller = new SettingsController();

    await controller.actionGetEmail(req.accessTokenPayload);

    res.status(controller.statusCode);
    res.send(controller.response);
});

settingsRouter.patch('/email', async (req, res) => {
    const controller = new SettingsController();

    await controller.actionEditEmail(req.body, req.accessTokenPayload);

    res.status(controller.statusCode);
    res.send(controller.response);
});

settingsRouter.patch('/password', async (req, res) => {
    const controller = new SettingsController();

    await controller.actionEditPassword(req.body, req.accessTokenPayload);

    res.status(controller.statusCode);
    res.send(controller.response);
});

module.exports = settingsRouter;
