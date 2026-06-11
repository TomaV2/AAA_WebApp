const express = require('express');
const path = require('path');
const app = express();
const { chromium } = require('playwright');
const PrgRegister = 10;
const fanucUrl = 'http://127.0.0.3/karel/ComGet?sFc=28';

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
    `gpioset -c gpiochip0 -t1s, ${pin}=${value}`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(error);
            }
        }
    );
}

function pulseGPIO(pin, durationMs = 500) {
    exec(
        `gpioset -c gpiochip0 -p ${durationMs}ms ${pin}=1`,
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
            setregister(PrgRegister, 1);
            // setGPIO(dipChocoPin, 0);
            break;
        case 'demo':
            setregister(PrgRegister, 2);
            // setGPIO(demoPin, 0);
            break;
        case 'transport-position':
            setregister(PrgRegister, 3);
            // setGPIO(transportPositionPin, 0);
            break;
        case 'handshake-visitor':
            setregister(PrgRegister, 4);
            // setGPIO(handshakeVisitorPin, 0);
            break;
    }
    res.json({ success: true });
});

async function setRegister(regNumber, value) {

    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    try {

        await page.goto(fanucUrl);

        await page.evaluate(({ regNumber, value }) => {

            sendRegValue(
                String(value),
                `iVal${regNumber}`,
                regNumber
            );

        }, { regNumber, value });

        console.log(`R[${regNumber}] = ${value}`);

    } finally {

        await browser.close();
    }
}

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});

app.get('/test', (req, res) => {
    res.send("OK SERVER");
});