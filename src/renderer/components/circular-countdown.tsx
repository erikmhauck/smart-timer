import React from 'react';
import { Flex } from '@fluentui/react-northstar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ICircularCountDownProps {
  totalTime: number;
  currentTime: number;
  textToDisplay: string;
}

export default function CircularCountDown({
  totalTime,
  currentTime,
  textToDisplay,
}: ICircularCountDownProps) {
  return (
    <Flex column>
      <CircularProgressbar
        value={currentTime}
        text={`${textToDisplay}`}
        minValue={0}
        maxValue={totalTime}
        styles={buildStyles({ textColor: 'black' })}
      />
    </Flex>
  );
}
