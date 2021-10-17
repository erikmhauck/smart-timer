import React from 'react';
import { Flex, Text } from '@fluentui/react-northstar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ITimerProps {
  totalTime: number;
  currentTime: number;
  textToDisplay: string;
}

export default function Timer({
  totalTime,
  currentTime,
  textToDisplay,
}: ITimerProps) {
  return (
    <Flex>
      <Text>total time: {totalTime}</Text>
      <Text>current time: {currentTime}</Text>
      <CircularProgressbar
        value={currentTime}
        text={`${textToDisplay}`}
        minValue={0}
        maxValue={totalTime}
        styles={buildStyles({ textColor: 'black' })}
      />
      ;
    </Flex>
  );
}
