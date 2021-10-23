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
          <Text>listening</Text>
          <Text>{currentSpeech}</Text>
        </Flex>
      )}
    </>
  );
}
