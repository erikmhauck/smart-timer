import React from 'react';
import { Flex } from '@fluentui/react-northstar';
import './App.global.css';
import Listener from './components/listener';
import { parseDuration } from './time-utils';
import Timer from './components/timer';
import SpeechDebugger from './components/speech-debugger';

const debugSpeech = false;

const destroyTimer = (
  duration: number,
  setParsedDurations: React.Dispatch<React.SetStateAction<number[]>>
) => {
  setParsedDurations((prevItems) => {
    return prevItems.filter((prevItem) => prevItem !== duration);
  });
};

const handleFinalResults = (
  data: string,
  setListening: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentSpeech: React.Dispatch<React.SetStateAction<string>>,
  setParsedDurations: React.Dispatch<React.SetStateAction<number[]>>
) => {
  setListening(false);
  setCurrentSpeech(data);
  if (data === 'cancel') {
    setParsedDurations([]);
  } else {
    const parsedDuration = parseDuration(data);
    if (parsedDuration) {
      setParsedDurations((prevItems) => [...prevItems, parsedDuration]);
    }
  }
};
export default function App() {
  const [currentSpeech, setCurrentSpeech] = React.useState('');
  const [listening, setListening] = React.useState(false);
  const [demoSpeech, setDemoSpeech] = React.useState('5 seconds');
  const [parsedDurations, setParsedDurations] = React.useState<number[]>([]);

  React.useEffect(() => {
    window.electron.ipcRenderer.on('hotword', (data: any) => {
      setListening(data);
    });
    window.electron.ipcRenderer.on('partial-results', (data: any) => {
      setCurrentSpeech(data);
    });
    window.electron.ipcRenderer.on('final-results', (data: any) => {
      handleFinalResults(
        data,
        setListening,
        setCurrentSpeech,
        setParsedDurations
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
              destroyTimer(parsedDuration, setParsedDurations)
            }
          />
        ))}
      </Flex>
    </Flex>
  );
}
