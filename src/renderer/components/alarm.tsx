import React from 'react';

interface IAlarmProps {
  alarming: boolean;
}

export default function Alarm({ alarming }: IAlarmProps) {
  return (
    <div>
      <div>alarming: {alarming.toString()}</div>
    </div>
  );
}
