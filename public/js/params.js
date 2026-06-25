async function SetGoHome() {

    window.location.href = "index.html"; 

}


async function setMotorOn(){

    RWS.Controller.setMotorState('motor_on')
}

async function setMotorOff(){

    RWS.Controller.setMotorState('motor_off')
}