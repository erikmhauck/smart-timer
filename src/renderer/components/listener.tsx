import React from 'react';
import { Flex, Header } from '@fluentui/react-northstar';

interface IListenerProps {
  currentSpeech: string;
}
export default function Listener({ currentSpeech }: IListenerProps) {
  return (
    <Flex column vAlign="center" hAlign="center">
      <Header styles={{ fontSize: '3rem' }} content={currentSpeech || '...'} />
    </Flex>
  );
}
