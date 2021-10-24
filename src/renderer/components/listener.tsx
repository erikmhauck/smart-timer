import React from 'react';
import { Flex, Text } from '@fluentui/react-northstar';

interface IListenerProps {
  listening: boolean;
  currentSpeech: string;
}
export default function Listener({ listening, currentSpeech }: IListenerProps) {
  return (
    <>
      {listening && (
        <Flex column vAlign="center" hAlign="center">
          <Text size="largest">...</Text>
          <Text size="largest">{currentSpeech}</Text>
        </Flex>
      )}
    </>
  );
}
