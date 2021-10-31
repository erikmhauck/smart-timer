import React from 'react';
import { Flex, Loader, Text } from '@fluentui/react-northstar';

interface IListenerProps {
  listening: boolean;
  currentSpeech: string;
}
export default function Listener({ listening, currentSpeech }: IListenerProps) {
  return (
    <>
      {listening && (
        <Flex column vAlign="center" hAlign="center">
          <Loader />
          <Text size="largest">{currentSpeech}</Text>
        </Flex>
      )}
    </>
  );
}
