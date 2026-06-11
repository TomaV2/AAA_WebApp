const express = require('express');
const path = require('path');
const app = express();
const fanucReg = require('./fanucRegister');

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

const { chromium } = require('playwright');
const PrgRegister = 10;
const fanucUrl = 'http://127.0.0.3/karel/ComGet?sFc=28';


async function setRegisterPrg(value) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(fanucUrl);

    await page.locator('input[name="iVal10"]').fill(String(value));
    await page.locator('input[name="iVal10"]').press('Tab');

    await browser.close();
}


app.post('/api/action/:name', async (req, res) => {

    const action = req.params.name;

    console.log("Action:", action);

    switch (action) {
        case 'dip-choco':
            setRegisterPrg(1);
            // setGPIO(dipChocoPin, 0);
            break;
        case 'demo':
            setRegisterPrg(2);
            // setGPIO(demoPin, 0);
            break;
        case 'transport-position':
           setRegisterPrg(3);
            // setGPIO(transportPositionPin, 0);
            break;
        case 'handshake-visitor':
            setRegisterPrg(4);
            // setGPIO(handshakeVisitorPin, 0);
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