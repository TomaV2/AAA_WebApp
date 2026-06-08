const fs = require('fs');

const FILE = './counter.json';

// Lire la valeur actuelle
function getCount() {
    const data = fs.readFileSync(FILE, 'utf8');
    const json = JSON.parse(data);

    return json.count;
}

// Sauvegarder une nouvelle valeur
function setCount(value) {
    const json = {
        count: value
    };

    fs.writeFileSync(
        FILE,
        JSON.stringify(json, null, 2)
    );
}

// Incrémenter le compteur
function increment() {
    const value = getCount() + 1;

    setCount(value);

    return value;
}

module.exports = {
    getCount,
    setCount,
    increment
};