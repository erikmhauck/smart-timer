import React from 'react';
import { Flex, Header } from '@fluentui/react-northstar';

export default function Clock() {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const hours = currentTime.getHours() % 12 || 12;
  const mins = currentTime.getMinutes();
  React.useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);
  }, []);
  return (
    <Flex column vAlign="center" hAlign="center">
      <Header
        color="white"
        styles={{ fontSize: '3rem' }}
        as="h1"
        content={`${hours}:${mins}`}
      />
    </Flex>
  );
}
