import { Flex, Text } from '@fluentui/react-northstar';
import React from 'react';

interface IAlarmProps {
  alarming: boolean;
}

export default function Alarm({ alarming }: IAlarmProps) {
  return (
    <Flex>
      <Text>alarming: {alarming.toString()}</Text>
    </Flex>
  );
}
