const express = require('express');
const path = require('path');
const app = express();

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/blog/opsec', (req, res) => {
    res.sendFile(__dirname + '/blog/opsec.html');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});