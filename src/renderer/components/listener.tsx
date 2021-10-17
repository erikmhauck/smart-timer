import React from 'react';

interface IListenerProps {
  listening: boolean;
  currentSpeech: string;
}
export default function Listener({ listening, currentSpeech }: IListenerProps) {
  return (
    <div>
      <div>listening: {listening.toString()}</div>
      <div>{currentSpeech}</div>
    </div>
  );
}
