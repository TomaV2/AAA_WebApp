const { exec } = require('child_process');

function setGPIO(pin, value)  {
    exec(
        `gpioset -c gpiochip0 -z ${pin}=${value}`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(error);
            }
        }
    );
}

function pulseGPIO(pin, durationMs = 500) {
    exec(
        `gpioset -c gpiochip0 -p ${durationMs}ms ${pin}=1`,
        (error) => {
            if (error) {
                console.error(error);
            }
        }
    );
}