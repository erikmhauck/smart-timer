import { Flex, Text } from '@fluentui/react-northstar';
import React from 'react';
import CircularCountDown from './circular-countdown';
import { getTimerText } from '../time-utils';

interface ITimerProps {
  totalTime: number;
  destroyCallback: any;
}
const secondsToAlarm = 10;

const startAlarm = (
  setAlarming: (arg0: boolean) => void,
  destroyCallback: any
) => {
  setAlarming(true);
  window.electron.ipcRenderer.buzz();
  setTimeout(() => {
    setAlarming(false);
    destroyCallback();
  }, secondsToAlarm * 1000);
};

export default function Timer({ totalTime, destroyCallback }: ITimerProps) {
  const [, setAlarming] = React.useState(false);
  const [timerTextToDisplay, setTimerTextToDisplay] = React.useState(
    getTimerText(totalTime)
  );
  const [time, setTime] = React.useState(totalTime);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const newTime = time - 1;
      if (newTime < 0) {
        startAlarm(setAlarming, destroyCallback);
      } else {
        setTime(newTime);
        setTimerTextToDisplay(getTimerText(newTime));
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [time, setTimerTextToDisplay, destroyCallback]);

  return (
    <Flex column vAlign="center" hAlign="center" fill>
      <Text color="white">total time: {totalTime}</Text>
      <CircularCountDown
        totalTime={totalTime}
        currentTime={time}
        textToDisplay={timerTextToDisplay}
      />
    </Flex>
  );
}
