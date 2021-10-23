import { Input, Button } from '@fluentui/react-northstar';
import React, { Dispatch, SetStateAction } from 'react';

interface ISpeechDebuggerProps {
  debugSpeech: boolean;
  demoSpeech: string;
  setDemoSpeech: (arg: any) => any;
  handleFinalResults: any;
  setListening: Dispatch<SetStateAction<boolean>>;
  setCurrentSpeech: Dispatch<SetStateAction<string>>;
  setParsedDurations: Dispatch<SetStateAction<number[]>>;
  parsedDurations: any[];
}
export default function SpeechDebugger({
  debugSpeech,
  demoSpeech,
  setDemoSpeech,
  handleFinalResults,
  setListening,
  setCurrentSpeech,
  setParsedDurations,
  parsedDurations,
}: ISpeechDebuggerProps) {
  return (
    <>
      {debugSpeech && (
        <>
          <Input
            value={demoSpeech}
            onChange={(_e: any, d: any) => setDemoSpeech(d!.value)}
          />
          <Button
            content="send"
            primary
            onClick={() => {
              handleFinalResults(
                demoSpeech,
                setListening,
                setCurrentSpeech,
                setParsedDurations,
                parsedDurations
              );
            }}
          />
        </>
      )}
    </>
  );
}
