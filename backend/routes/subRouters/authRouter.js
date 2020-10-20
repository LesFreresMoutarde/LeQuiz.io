const authRouter = require('express').Router();


authRouter.get('/access-token', (req, res) => {
    res.json({endpoint: 'GET /auth/access-token'});
});

authRouter.get('/verify-access-token', (req, res) => {
    res.json({endpoint: 'GET /auth/verify-access-token'})
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