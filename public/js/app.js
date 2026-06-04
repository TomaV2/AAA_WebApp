async function DipChoco(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await fetch(`/api/dip-choco`,{
        method:"POST"
    });

    document.getElementById("status").innerText =
        `DipChoco lancée`;
}

async function Demo(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await fetch(`/api/demo`,{
        method:"POST"
    });

    document.getElementById("status").innerText =
        `Demo lancée`;
}

async function TransportPosition(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await fetch(`/api/transport-position`,{
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