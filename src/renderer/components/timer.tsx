import { Flex } from '@fluentui/react-northstar';
import React from 'react';
import Alarm from './alarm';
import CircularCountDown from './circular-countdown';

interface ITimerProps {
  alarming: boolean;
  totalTime: number;
  currentTime: number;
  textToDisplay: string;
}

export default function Timer({
  alarming,
  totalTime,
  currentTime,
  textToDisplay,
}: ITimerProps) {
  return (
    <Flex>
      <Alarm alarming={alarming} />
      <CircularCountDown
        totalTime={totalTime}
        currentTime={currentTime}
        textToDisplay={textToDisplay}
      />{' '}
    </Flex>
  );
}
