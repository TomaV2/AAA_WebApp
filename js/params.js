var motorOnButton;
var motorOffButton;
var startButton;
var ppToMainButton;
var goHomeButton;
var transportPositionButton;
var enableGripperSwitch;
var takeBiscuitJawsSwitch;
var robotDipInFontainSwitch;

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
        transportPositionButton = new FPComponents.Button_A();
        transportPositionButton.attachToId('btnTransportPosition');
        transportPositionButton.text = 'Transport Position';
        transportPositionButton.onclick = async function() {
            await SetAction(3);
            console.log("transportPositionButton button clicked");
            };
        }
        catch(e) 
        {console.error("Error creating transportPositionButton:", e);
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

    // Switch 
    try {
        enableGripperSwitch = new FPComponents.Switch_A();
        enableGripperSwitch.scale = 1.5;//Set the switch to a 1.5 scale.
        enableGripperSwitch.attachToId("enableGripperSwitch");
        enableGripperSwitch.onchange = async function () {
            //Check switch position before turn on or turn off the motors
            if (enableGripperSwitch.active == false) {
                console.log("gripper > to_off");
                await RWS.Rapid.setDataValue('T_ROB1', 'Wizard_LoadData', 'bEnableGripper', false);
            } else {
                console.log("gripper > to_on");
                await RWS.Rapid.setDataValue('T_ROB1', 'Wizard_LoadData', 'bEnableGripper', true);
            }
        }
        LoadSwitchState(enableGripperSwitch, 'bEnableGripper');
    } catch (e) { console.log("Error with the switch button!"); }


    try {
        takeBiscuitJawsSwitch = new FPComponents.Switch_A();
        takeBiscuitJawsSwitch.scale = 1.5;//Set the switch to a 1.5 scale.
        takeBiscuitJawsSwitch.attachToId("takeBiscuitJawsSwitch");
        takeBiscuitJawsSwitch.onchange = async function () {
            //Check switch position before turn on or turn off the motors
            if (takeBiscuitJawsSwitch.active == false) {
                console.log("takeBiscuitJaws > to_off");
                await RWS.Rapid.setDataValue('T_ROB1', 'Wizard_LoadData', 'bTakeBiscuitWithJaws', false);
            } else {
                console.log("takeBiscuitJaws > to_on");
                await RWS.Rapid.setDataValue('T_ROB1', 'Wizard_LoadData', 'bTakeBiscuitWithJaws', true);
            }
        } 
        LoadSwitchState(takeBiscuitJawsSwitch, 'bTakeBiscuitWithJaws');
    } catch (e) { console.log("Error with the switch button!"); }

    try {
        robotDipInFontainSwitch = new FPComponents.Switch_A();
        robotDipInFontainSwitch.scale = 1.5;//Set the switch to a 1.5 scale.
        robotDipInFontainSwitch.attachToId("robotDipInFontainSwitch");
        robotDipInFontainSwitch.onchange = async function () {
            //Check switch position before turn on or turn off the motors
            if (robotDipInFontainSwitch.active == false) {
                console.log("robotDipInFontainSwitch > to_off");
                await RWS.Rapid.setDataValue('T_ROB1', 'Wizard_LoadData', 'bRobotInFontain', false);
            } else {
                console.log("robotDipInFontainSwitch > to_on");
                await RWS.Rapid.setDataValue('T_ROB1', 'Wizard_LoadData', 'bRobotInFontain', true);
            }
        } 
        LoadSwitchState(robotDipInFontainSwitch, 'bRobotInFontain');
    } catch (e) { console.log("Error with the switch button!"); }



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

async function LoadSwitchState(Switch, SwitchName) {
    var state = await RWS.Controller.getControllerState();
    console.log(state);
    if (await GetRobotValue(SwitchName) == true) {
        Switch.active = true;
    } else {
        Switch.active = false;
    }
}

async function GetRobotValue(variableName) {

    var data = await RWS.Rapid.getData('T_ROB1', 'Wizard_LoadData', variableName); //The 'UpLimit' data is accessed.
    await data.fetch(); //Recovers the last data value 
    var value = await data.getValue();//Data value is obtained
    return value;
}