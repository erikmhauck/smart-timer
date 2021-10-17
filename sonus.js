// Load in smart mirror config
const os = require('os');
const fs = require('fs');
const path = require('path');

const Sonus = require('sonus');
const speech = require('@google-cloud/speech');

const config = require('./config.json');

if (
  !config ||
  !config.speech ||
  !config.speech.keyFilename ||
  !config.speech.hotwords ||
  !config.general.language
) {
  throw new Error(
    'Configuration Error! See: https://docs.smart-mirror.io/docs/configure_the_mirror.html#speech'
  );
}

const keyFile = JSON.parse(
  fs.readFileSync(path.resolve(config.speech.keyFilename), 'utf8')
);

// Configure Sonus
const client = new speech.SpeechClient({
  projectId: keyFile.project_id,
  keyFilename: config.speech.keyFilename,
});

// Hotword helpers
const sensitivity = config.speech.sensitivity || '0.5';
const hotwords = [];
const addHotword = (modelFile, hotword) => {
  const file = path.resolve(modelFile);
  if (fs.existsSync(file)) {
    hotwords.push({ file, hotword, sensitivity });
  } else {
    console.log('Model: "', file, '" not found.');
  }
};

for (let i = 0; i < config.speech.hotwords.length; i += 1) {
  addHotword(
    config.speech.hotwords[i].model,
    config.speech.hotwords[i].keyword,
    sensitivity
  );
}

const { language } = config.general;
const recordProgram =
  (!process.platform === 'darwin' && os.arch().startsWith('arm')) ||
  os.arch === 'x64'
    ? 'arecord'
    : 'rec';
const device = config.speech.device !== '' ? config.speech.device : 'default';
const sonus = Sonus.init({ hotwords, language, recordProgram, device }, client);

// Start Recognition
Sonus.start(sonus);

// Event IPC
sonus.on('hotword', (index) => console.log('!h:', index));
sonus.on('partial-result', (result) => console.log('!p:', result));
sonus.on('final-result', (result) => console.log('!f:', result));
sonus.on('error', (error) => console.error('!e:', error));
