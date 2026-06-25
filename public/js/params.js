async function SetGoHome() {

    window.location.href = "index.html"; 

}


async function SetMotorOn(){

    console.log('MotorOn')
    RWS.Controller.setMotorState('motor_on')
}

async function SetMotorOff(){

    console.log('MotorOff')
    RWS.Controller.setMotorState('motor_off')
}