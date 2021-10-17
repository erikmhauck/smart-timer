import React from 'react';
import { Flex, Text } from '@fluentui/react-northstar';

interface IListenerProps {
  listening: boolean;
  currentSpeech: string;
}
export default function Listener({ listening, currentSpeech }: IListenerProps) {
  return (
    <Flex>
      <Text>listening: {listening.toString()}</Text>
      <Text>{currentSpeech}</Text>
    </Flex>
  );
}
