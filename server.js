const express = require('express');
const path = require('path');
const { sendCommand } = require('./robot');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/dip-choco', async (req, res) => {

    try {

        const response = await sendCommand('DIP_CHOCO');

        res.json({
            success: true,
            robot: response
        });

    } catch(err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});


app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});