const express = require('express');
const path = require('path');
const app = express();

const { exec } = require('child_process');
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

function setGPIO(pin, value)  {
    exec(
        `gpioset -c gpiochip0 ${pin}=${value}`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(error);
            }
        }
    );
}

function pulseGPIO(pin, durationMs = 500) {
    exec(
        'gpioset -c gpiochip0 -t 1s,0 ${pin}=1'
        // `gpioset -c gpiochip0 -p ${durationMs}ms ${pin}=1`,
        (error) => {
            if (error) {
                console.error(error);
            }
        }
    );
}


app.post('/api/action/:name', async (req, res) => {

    const action = req.params.name;

    console.log("Action:", action);

    switch (action) {
        case 'dip-choco':
            pulseGPIO(dipChocoPin, 1000);
            // setGPIO(dipChocoPin, 1);
            // setTimeout(() => setGPIO(dipChocoPin, 0), 1000);
            break;
        case 'demo':
            setGPIO(demoPin, 1);
            setTimeout(() => setGPIO(demoPin, 0), 1000);
            break;
        case 'transport-position':
            setGPIO(transportPositionPin, 1);
            setTimeout(() => setGPIO(transportPositionPin, 0), 1000);
            break;
        case 'handshake-visitor':
            setGPIO(handshakeVisitorPin, 1);
            setTimeout(() => setGPIO(handshakeVisitorPin, 0), 1000);
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