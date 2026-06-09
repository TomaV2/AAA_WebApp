async function incCounter() {

    const response = await fetch('/increment', {
        method: 'POST'
    });
    const data = await response.json();
}

async function DipChoco(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await fetch(`/api/action/dip-choco`,{
        method:"POST"
    });
    await incCounter();

    document.getElementById("status").innerText =
        `DipChoco lancée`;
}

async function HandshakeVisitor(){
    
    await fetch(`/api/action/handshake-visitor`,{
        method:"POST"
    }); 
}

async function Demo(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await fetch(`/api/action/demo`,{
        method:"POST"
    });

    document.getElementById("status").innerText =
        `Demo lancée`;
}

async function TransportPosition(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await fetch(`/api/action/transport-position`,{
        method:"POST"
    });

    document.getElementById("status").innerText =
        `Position de transport lancée`;
}

function setLanguage(lang) {

    document.getElementById('title').textContent =
        translations[lang].title;

    document.getElementById('btnDipChoco').textContent =
        translations[lang].dipChoco;

    document.getElementById('btnHandshakeVisitor').textContent =
        translations[lang].handshakeVisitor;

    document.getElementById('btnTransportPosition').textContent =
        translations[lang].transportPosition;

    document.getElementById('btnDemo').textContent =
        translations[lang].demo;

    document.getElementById('status').textContent =
        translations[lang].status;
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

if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {

        navigator.serviceWorker
            .register('/sw.js')
            .then(() => {
                console.log('Service Worker enregistré');
            })
            .catch(err => {
                console.error(err);
            });

    });

}