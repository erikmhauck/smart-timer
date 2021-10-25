import React from 'react';
import { Flex } from '@fluentui/react-northstar';
import './App.global.css';
import Listener from './components/listener';
import { parseDuration } from './time-utils';
import Timer from './components/timer';
import SpeechDebugger from './components/speech-debugger';

const debugSpeech = false;

const secondsAfterAlarmToSleepDisplay = 10;

// send buzz on first load
window.electron.ipcRenderer.buzz();
window.electron.ipcRenderer.displayOff();

const createScreenTimeout = (
  setScreenTimeout: React.Dispatch<
    React.SetStateAction<NodeJS.Timeout | undefined>
  >,
  parsedDurations: number[]
) => {
  if (parsedDurations.length === 0) {
    console.log('Creating screen timeout');
    const newTimeout = setTimeout(() => {
      console.log('turning screen off');
      window.electron.ipcRenderer.displayOff();
    }, secondsAfterAlarmToSleepDisplay * 1000);
    setScreenTimeout((prevTimeout: NodeJS.Timeout | undefined) => {
      if (prevTimeout) {
        clearTimeout(prevTimeout);
      }
      return newTimeout;
    });
  }
};

const destroyTimer = (
  duration: number,
  setParsedDurations: React.Dispatch<React.SetStateAction<number[]>>,
  setScreenTimeout: React.Dispatch<
    React.SetStateAction<NodeJS.Timeout | undefined>
  >
) => {
  setParsedDurations((prevItems) => {
    const remainingParsedDurations = prevItems.filter(
      (prevItem) => prevItem !== duration
    );
    createScreenTimeout(setScreenTimeout, remainingParsedDurations);
    return remainingParsedDurations;
  });
};

const handleFinalResults = (
  data: string,
  setListening: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentSpeech: React.Dispatch<React.SetStateAction<string>>,
  setParsedDurations: React.Dispatch<React.SetStateAction<number[]>>,
  setScreenTimeout: React.Dispatch<
    React.SetStateAction<NodeJS.Timeout | undefined>
  >
) => {
  setListening(false);
  setCurrentSpeech(data);
  if (data === 'cancel') {
    setParsedDurations([]);
  } else {
    const parsedDuration = parseDuration(data);
    setParsedDurations((prevItems) => {
      if (!parsedDuration) {
        createScreenTimeout(setScreenTimeout, prevItems);
        return prevItems;
      }
      return [...prevItems, parsedDuration];
    });
  }
};
export default function App() {
  const [currentSpeech, setCurrentSpeech] = React.useState('');
  const [listening, setListening] = React.useState(false);
  const [demoSpeech, setDemoSpeech] = React.useState('5 seconds');
  const [parsedDurations, setParsedDurations] = React.useState<number[]>([]);
  const [, setScreenTimeout] = React.useState<NodeJS.Timeout>();

  React.useEffect(() => {
    window.electron.ipcRenderer.on('hotword', (data: any) => {
      setListening(data);
      setCurrentSpeech('');
    });
    window.electron.ipcRenderer.on('partial-results', (data: any) => {
      setCurrentSpeech(data);
    });
    window.electron.ipcRenderer.on('final-results', (data: any) => {
      handleFinalResults(
        data,
        setListening,
        setCurrentSpeech,
        setParsedDurations,
        setScreenTimeout
      );
    });
    // TODO: how else can i do this without needing this lint exclusion?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      fill
      column
      vAlign="center"
      hAlign="center"
      styles={{ minHeight: '100vh' }}
    >
      <Listener currentSpeech={currentSpeech} listening={listening} />
      <SpeechDebugger
        debugSpeech={debugSpeech}
        demoSpeech={demoSpeech}
        setDemoSpeech={setDemoSpeech}
        handleFinalResults={handleFinalResults}
        setListening={setListening}
        setCurrentSpeech={setCurrentSpeech}
        setParsedDurations={setParsedDurations}
      />
      <Flex hAlign="center" fill>
        {parsedDurations.map((parsedDuration) => (
          <Timer
            key={parsedDuration}
            totalTime={parsedDuration}
            destroyCallback={() =>
              destroyTimer(parsedDuration, setParsedDurations, setScreenTimeout)
            }
          />
        ))}
      </Flex>
    </Flex>
  );
}
