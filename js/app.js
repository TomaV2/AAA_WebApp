async function SetRobotParameter(paramName, paramValue){
    
    await RWS.Rapid.setDataValue('T_ROB1','Wizard',paramName,paramValue);

}

async function DipChoco(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await SetRobotParameter('CommandRequested','dip');

    document.getElementById("status").innerText =
        `DipChoco lancée`;
}

async function Demo(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await SetRobotParameter('CommandRequested','demo');

    document.getElementById("status").innerText =
        `Demo lancée`;
}

async function TransportPosition(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await SetRobotParameter('CommandRequested','transport');

    document.getElementById("status").innerText =
        `Position de transport lancée`;
}

function setLanguage(lang) {

    document.getElementById('title').textContent =
        translations[lang].title;

    document.getElementById('btnDipChoco').textContent =
        translations[lang].dipChoco;

    document.getElementById('btnTransportPosition').textContent =
        translations[lang].transportPosition;

    document.getElementById('btnDemo').textContent =
        translations[lang].demo;

}

document.addEventListener('DOMContentLoaded', () => {

    const languageEl = document.getElementById('language');

    if (languageEl) {
        languageEl.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }

    setLanguage('en');
});

async function GoToParams() {
    window.location.href = "params.html";   
}

const aaaLogo = document.getElementById('AAA_Logo');
aaaLogo.addEventListener('click', () => {
    GoToParams();
});