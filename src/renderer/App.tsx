import React from 'react';
import { Button, Flex, Input } from '@fluentui/react-northstar';
import './App.global.css';
import Listener from './components/listener';
import { parseDuration } from './time-utils';
import Timer from './components/timer';

const handleFinalResults = (
  data: string,
  setListening: (arg0: boolean) => void,
  setCurrentSpeech: (arg0: string) => void,
  setParsedDurations: (arg0: number[]) => void,
  parsedDurations: number[]
) => {
  setListening(false);
  setCurrentSpeech(data);
  if (data === 'cancel') {
    // TODO: cancel the timers
    setParsedDurations([]);
  }
  const parsedDuration = parseDuration(data);
  if (parsedDuration) {
    setParsedDurations([...parsedDurations, parsedDuration]);
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
        setParsedDurations,
        parsedDurations
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
      <Input value={demoSpeech} onChange={(_e, d) => setDemoSpeech(d!.value)} />
      <Button
        content="send"
        primary
        onClick={() => {
          handleFinalResults(
            demoSpeech,
            setListening,
            setCurrentSpeech,
            setParsedDurations,
            parsedDurations
          );
        }}
      />
      <Flex hAlign="center" fill>
        {parsedDurations.map((parsedDuration, idx: number) => (
          <Timer key={idx} totalTime={parsedDuration} />
        ))}
      </Flex>
    </Flex>
  );
}
