const buzzerIntervalInMs = 20;
const buzzerLengthInMs = 1000;
const isRPI = process.platform !== 'darwin';
let Buzzer: {
  readSync: () => number;
  writeSync: (arg0: number) => void;
  unexport: () => void;
} = { readSync: () => 0, writeSync: () => {}, unexport: () => {} };
let toggleBuzzer: () => void = () => {
  console.log('pretending to toggle buzzer');
};

if (isRPI) {
  // eslint-disable-next-line global-require
  const { Gpio } = require('onoff');

  Buzzer = new Gpio(4, 'out'); // use GPIO pin 4, and specify that it is output

  toggleBuzzer = () => {
    if (Buzzer.readSync() === 0) {
      // check the pin state, if the state is 0 (or off)
      Buzzer.writeSync(1); // set pin state to 1 (turn LED on)
    } else {
      Buzzer.writeSync(0); // set pin state to 0 (turn LED off)
    }
  };
}
const activateBuzzer = () => {
  const buzzerInterval = setInterval(toggleBuzzer, buzzerIntervalInMs); // run the blinkLED function every 250ms

  setTimeout(() => {
    clearInterval(buzzerInterval); // Stop buzzer intervals
    Buzzer.writeSync(0); // Turn Buzzer off
    Buzzer.unexport(); // Unexport GPIO to free resources
  }, buzzerLengthInMs);
};

export = activateBuzzer;
