var motorOnButton;
var motorOffButton;
var startButton;
var ppToMainButton;
var goHomeButton;

window.addEventListener('load', async function () {
    createSettingsContent();
});

function createSettingsContent() {
    try {
        startButton = new FPComponents.Button_A();
        startButton.attachToId('btnStart');
        startButton.text = 'Start';
        startButton.onclick = async function() {
            console.log("Start button clicked");
            await Start();
        };
    }
    catch(e) 
    {console.error("Error creating startButton:", e);
    }


    try {
        motorOnButton = new FPComponents.Button_A();
        motorOnButton.attachToId('btnMotorOn');
        motorOnButton.text = 'Motor On';
        motorOnButton.onclick = async function() {
            console.log("Motor On button clicked");
            await SetMotorOn();
        };
    }
    catch(e) 
    {console.error("Error creating motorOnButton:", e);
    }

    try {
        motorOffButton = new FPComponents.Button_A();
        motorOffButton.attachToId('btnMotorOff');
        motorOffButton.text = 'Motor Off';
        motorOffButton.onclick = async function() {
            console.log("Motor Off button clicked");
            await SetMotorOff();
        };
    }
    catch(e) 
    {console.error("Error creating motorOffButton:", e);
    }

    try {
        ppToMainButton = new FPComponents.Button_A();
        ppToMainButton.attachToId('btnPPToMain');
        ppToMainButton.text = 'PP to Main';
        ppToMainButton.onclick = async function() {
            console.log("PP to Main button clicked");
            await PpToMain();
        };
    }
    catch(e) 
    {console.error("Error creating ppToMainButton:", e);
    }

    try {
        goHomeButton = new FPComponents.Button_A();
        goHomeButton.attachToId('btnGoHome');
        goHomeButton.text = 'Go Home';
        goHomeButton.onclick = async function() {
            console.log("Go Home button clicked");
            await SetGoHome();
        };
    }
    catch(e) 
    {console.error("Error creating goHomeButton:", e);
    }
}


async function SetGoHome() {
    window.location.href = "index.html"; 
}

async function SetAction(id) {
    await RWS.Rapid.setDataValue('T_ROB1', 'Wizard_LoadData', 'nRequestId', id);
}

async function Start() {
    await RWS.Rapid.startExecution({ 
                    regainMode: 'continue',
                    executionMode: 'continue',
                    cycleMode: 'forever',
                    condition: 'none',
                    stopAtBreakpoint: false,
                    enableByTSP: true
                });
}

async function PpToMain() {
    await RWS.Rapid.resetPP();
}

async function SetMotorOn(){

    console.log('MotorOn')
    await RWS.Controller.setMotorsState('motors_on');
}

async function SetMotorOff(){

    console.log('MotorOff');
    await RWS.Controller.setMotorsState('motors_off');
}