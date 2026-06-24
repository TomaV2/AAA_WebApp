const express = require('express');
const path = require('path');
const { sendCommand } = require('./robot');
const app = express();

app.use(express.json());

app.use(express.static('public'));

app.post('/api/action/:name', async (req, res) => {

    const action = req.params.name;

    console.log("Action:", action);

    await sendCommand(action);

    res.json({ success: true });
});


app.listen(3000, () => {
    console.log('Server start at http://localhost:3000');
});

app.get('/test', (req, res) => {
    res.send("OK SERVER");
});