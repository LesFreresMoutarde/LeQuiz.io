const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    res.statusCode = 200;
    res.send('lequiz.io-backend container');
});

app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`);
});