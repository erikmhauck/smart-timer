const { Gpio } = require('onoff');

const buzzerIntervalInMs = 20;
const buzzerLengthInMs = 1000;
const buzzerPin = 4;

const buzzer = new Gpio(buzzerPin, 'out');

const toggleBuzzer = () => {
  if (buzzer.readSync() === 0) {
    // check the pin state, if the state is 0 (or off)
    buzzer.writeSync(1); // set pin state to 1 (turn LED on)
  } else {
    buzzer.writeSync(0); // set pin state to 0 (turn LED off)
  }
};

const buzzerInterval = setInterval(toggleBuzzer, buzzerIntervalInMs); // run the blinkLED function every 250ms

setTimeout(() => {
  clearInterval(buzzerInterval); // Stop buzzer intervals
  buzzer.writeSync(0); // Turn Buzzer off
  buzzer.unexport(); // Unexport GPIO to free resources
}, buzzerLengthInMs);
