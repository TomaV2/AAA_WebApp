const express = require('express');
const path = require('path');
const app = express();
const counter = require('./public/js/counter');

const Gpio = require('pigpio').Gpio;
const relayDip = new Gpio(17, { mode: Gpio.OUTPUT });
const relayDemo = new Gpio(27, { mode: Gpio.OUTPUT });
const relayTrsPos = new Gpio(22, { mode: Gpio.OUTPUT });

app.use(express.json());

app.use(express.static('public'));

app.post('/increment', (req, res) => {
    res.json({
        count: counter.increment()
    });
});

app.post('/api/action/:name', async (req, res) => {

    const action = req.params.name;

    console.log("Action:", action);

    switch (action) {
        case 'dip-choco':
            relayDip.digitalWrite(1);
            setTimeout(() => relayDip.digitalWrite(0), 1000);
            break;
        case 'demo':
            relayDemo.digitalWrite(1);
            setTimeout(() => relayDemo.digitalWrite(0), 1000);
            break;
        case 'transport-position':
            relayTrsPos.digitalWrite(1);
            setTimeout(() => relayTrsPos.digitalWrite(0), 1000);
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