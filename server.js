const express = require('express');
const path = require('path');
const app = express();

const gpio = require('./public/js/GPIO');
const dipChocoPin = '17';
const demoPin = '27';
const transportPositionPin = '22';
const handshakeVisitorPin = '10';

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log("➡️", req.method, req.url);
    next();
});


app.post('/api/action/:name', async (req, res) => {

    const action = req.params.name;

    console.log("Action:", action);

    switch (action) {
        case 'dip-choco':
            gpio.setGPIO(dipChocoPin, 1);
            setTimeout(() => gpio.setGPIO(dipChocoPin, 0), 1000);
            break;
        case 'demo':
            gpio.setGPIO(demoPin, 1);
            setTimeout(() => gpio.setGPIO(demoPin, 0), 1000);
            break;
        case 'transport-position':
            gpio.setGPIO(transportPositionPin, 1);
            setTimeout(() => gpio.setGPIO(transportPositionPin, 0), 1000);
            break;
        case 'handshake-visitor':
            gpio.setGPIO(handshakeVisitorPin, 1);
            setTimeout(() => gpio.setGPIO(handshakeVisitorPin, 0), 1000);
            break;
    }
    res.json({ success: true });
});


app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});

app.get('/test', (req, res) => {
    res.send("OK SERVER");
});