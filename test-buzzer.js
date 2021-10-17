const { Gpio } = require('onoff');

const Buzzer = new Gpio(4, 'out'); // use GPIO pin 4, and specify that it is output
const interval = process.argv[2];
const length = process.argv[3];

const toggleBuzzer = () => {
  if (Buzzer.readSync() === 0) {
    // check the pin state, if the state is 0 (or off)
    Buzzer.writeSync(1); // set pin state to 1 (turn LED on)
  } else {
    Buzzer.writeSync(0); // set pin state to 0 (turn LED off)
  }
};

console.log(`starting buzz with interval: ${interval} and length: ${length}`);
const buzzerInterval = setInterval(toggleBuzzer, interval); // run the blinkLED function every 250ms

const endBuzzer = () => {
  // function to stop blinking
  clearInterval(buzzerInterval); // Stop blink intervals
  Buzzer.writeSync(0); // Turn LED off
  Buzzer.unexport(); // Unexport GPIO to free resources
};

setTimeout(endBuzzer, length); // stop blinking after 5 seconds
