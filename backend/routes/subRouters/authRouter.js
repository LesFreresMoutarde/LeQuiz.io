const authRouter = require('express').Router();
const authController = require('../../controllers/authController');


authRouter.get('/access-token', (req, res) => {
    authController.actionAccessToken(req, res);
});

authRouter.get('/verify-token', (req, res) => {
    authController.actionVerifyToken(req, res);
});

authRouter.post('/register', (req, res) => {
    res.json({endpoint: 'POST /auth/register'})
});

authRouter.post('/login', (req, res) => {
    res.json({endpoint: 'POST /auth/login'})
});

authRouter.post('/logout', (req, res) => {
    res.json({endpoint: 'POST /auth/logout'})
});


module.exports = authRouter;