import React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import './App.global.css';
import Alarm from './components/alarm';
import Listener from './components/listener';
import Timer from './components/timer';
import { parseDuration, getTimerText } from './time-utils';

const secondsToAlarm = 2;

const startAlarm = (setAlarming: (arg0: boolean) => void) => {
  setAlarming(true);
  setTimeout(() => {
    console.log(`alarming is finished`);
    window.electron.ipcRenderer.buzz();
    setAlarming(false);
  }, secondsToAlarm * 1000);
};

const startTimer = (
  totalTime: number,
  setCurrentTime: (arg0: number) => void,
  setAlarming: (arg0: boolean) => void,
  setTimerTextToDisplay: (arg0: string) => void
) => {
  console.log(`starting ${totalTime} second timer`);
  let currentTime = totalTime;
  setCurrentTime(currentTime);
  // start decrementing every second
  const decrementInterval = setInterval(() => {
    currentTime -= 1;
    setCurrentTime(currentTime);
    setTimerTextToDisplay(getTimerText(currentTime));
  }, 1000);
  // stop decrementer after total time
  setTimeout(() => {
    clearInterval(decrementInterval);
    console.log(`${totalTime} timer is finished`);
    startAlarm(setAlarming);
  }, totalTime * 1000);
};

export default function App() {
  const [currentSpeech, setCurrentSpeech] = React.useState('');
  const [listening, setListening] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [alarming, setAlarming] = React.useState(false);
  const [timerTextToDisplay, setTimerTextToDisplay] = React.useState('');

  React.useEffect(() => {
    window.electron.ipcRenderer.on('hotword', (data: any) => {
      setListening(data);
    });
    window.electron.ipcRenderer.on('partial-results', (data: any) => {
      setCurrentSpeech(data);
    });
    window.electron.ipcRenderer.on('final-results', (data: any) => {
      setListening(false);
      setCurrentSpeech(data);
      const parsedDuration = parseDuration(data);
      if (parsedDuration) {
        setTotalTime(parsedDuration);
        startTimer(
          parsedDuration,
          setCurrentTime,
          setAlarming,
          setTimerTextToDisplay
        );
      }
    });
    // TODO: how else can i do this without needing this lint exclusion?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex fill column vAlign="center" hAlign="center">
      <Button
        onClick={() => {
          const data = '1 minute 5 seconds';
          setListening(false);
          setCurrentSpeech(data);
          const parsedDuration = parseDuration(data);
          if (parsedDuration) {
            setTotalTime(parsedDuration);
            startTimer(
              parsedDuration,
              setCurrentTime,
              setAlarming,
              setTimerTextToDisplay
            );
          }
        }}
      >
        test
      </Button>
      <Alarm alarming={alarming} />
      <Timer
        totalTime={totalTime}
        currentTime={currentTime}
        textToDisplay={timerTextToDisplay}
      />
      <Listener currentSpeech={currentSpeech} listening={listening} />
    </Flex>
  );
}
