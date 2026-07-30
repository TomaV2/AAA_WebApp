var dipChocoButton;
var demoButton;
var transportPositionButton;
var paramsButton;


// Wait for the window to load before executing any code
window.addEventListener('load', async function () {
    // fpComponentsEnableLog();
    createMainContent();
    createSettingsContent();
});

function createMainContent() {
    createAllButtons();
}

function createAllButtons() {
    try {
        dipChocoButton = new FPComponents.Button_A();
        dipChocoButton.attachToId('btnDipChoco');
        dipChocoButton.text = 'Give me a waffle !';
        dipChocoButton.onclick = async function() {
            await SetAction(1);
            console.log("Dip Choco button clicked");
            };
        }
        catch(e) 
        {console.error("Error creating dipChocoButton:", e);
        }
    

    try {
        demoButton = new FPComponents.Button_A();
        demoButton.attachToId('btnDemo');
        demoButton.text = 'Demo';
        demoButton.onclick = async function() {
            await SetAction(2);
            console.log("Demo button clicked");
            };
        }
        catch(e) 
        {console.error("Error creating demoButton:", e);
        }
    
    
}

async function SetRobotParameter(paramName, paramValue){
    
    await RWS.Rapid.setDataValue('T_ROB1','Wizard',paramName,paramValue);

}

async function DipChoco(){

    await SetRobotParameter('CommandRequested','dip');

}

async function Demo(){

    await SetRobotParameter('CommandRequested','demo');

}

async function TransportPosition(){

    await SetRobotParameter('CommandRequested','transport');

}

// function setLanguage(lang) {

//     document.getElementById('title').textContent =
//         translations[lang].title;

//     document.getElementById('btnDipChoco').textContent =
//         translations[lang].dipChoco;

//     document.getElementById('btnTransportPosition').textContent =
//         translations[lang].transportPosition;

//     document.getElementById('btnDemo').textContent =
//         translations[lang].demo;

// }

// document.addEventListener('DOMContentLoaded', () => {

//     const languageEl = document.getElementById('language');

//     if (languageEl) {
//         languageEl.addEventListener('change', (event) => {
//             setLanguage(event.target.value);
//         });
//     }

//     setLanguage('en');
// });

async function GoToParams() {
    window.location.href = "params.html";   
}

const aaaLogo = document.getElementById('AAA_Logo');
aaaLogo.addEventListener('click', () => {
    GoToParams();
});


async function HandshakeVisitor(){
    await RWS.IO.setSignalValue('HandshakeVisitor', 1);
}

async function SetAction(id) {
    await RWS.Rapid.setDataValue('T_ROB1', 'Wizard_LoadData', 'nRequestId', id);
}