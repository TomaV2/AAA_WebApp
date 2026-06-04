const net = require('net');

const ROBOT_IP = '192.168.1.100';
const ROBOT_PORT = 9000;

function sendCommand(command) {
    return new Promise((resolve, reject) => {

        const client = new net.Socket();

        client.connect(ROBOT_PORT, ROBOT_IP, () => {

            console.log(`Envoi : ${command}`);

            client.write(command + '\n');
        });

        client.on('data', data => {

            const response = data.toString().trim();

            console.log('Robot:', response);

            client.destroy();

            resolve(response);
        });

        client.on('error', err => {
            reject(err);
        });

        client.on('close', () => {
            console.log('Connexion fermée');
        });

    });
}

module.exports = { sendCommand };