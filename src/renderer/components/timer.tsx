import { Flex, Text } from '@fluentui/react-northstar';
import React from 'react';
import Alarm from './alarm';
import CircularCountDown from './circular-countdown';
import { getTimerText } from '../time-utils';

interface ITimerProps {
  totalTime: number;
}
const secondsToAlarm = 2;

const startAlarm = (setAlarming: (arg0: boolean) => void) => {
  setAlarming(true);
  setTimeout(() => {
    console.log(`alarming is finished`);
    window.electron.ipcRenderer.buzz();
    setAlarming(false);
  }, secondsToAlarm * 1000);
};

export default function Timer({ totalTime }: ITimerProps) {
  // const [currentTime, setCurrentTime] = React.useState(0);
  const [alarming, setAlarming] = React.useState(false);
  const [timerTextToDisplay, setTimerTextToDisplay] = React.useState(
    getTimerText(totalTime)
  );
  const [time, setTime] = React.useState(totalTime);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const newTime = time - 1;
      if (newTime < 0) {
        startAlarm(setAlarming);
      } else {
        setTime(newTime);
        setTimerTextToDisplay(getTimerText(newTime));
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [time, setTimerTextToDisplay]);

  return (
    <Flex column vAlign="center" hAlign="center" fill>
      <Alarm alarming={alarming} />
      <Text>total time: {totalTime}</Text>
      <CircularCountDown
        totalTime={totalTime}
        currentTime={time}
        textToDisplay={timerTextToDisplay}
      />
    </Flex>
  );
}
