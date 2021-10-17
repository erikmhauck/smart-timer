import React from 'react';
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
    <div>
      <div>total time: {totalTime}</div>
      <div>current time: {currentTime}</div>
      <CircularProgressbar
        value={currentTime}
        text={`${textToDisplay}`}
        minValue={0}
        maxValue={totalTime}
        styles={buildStyles({ textColor: 'black' })}
      />
      ;
    </div>
  );
}
