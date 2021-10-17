import { Duration } from 'luxon';

/**
 * Parse spoken duration into seconds
 * @param  {String} string - e.g.: `1 minute` or `5 minutes and 10 seconds`
 * @return {Number}        - duration in seconds
 */
const parseDuration = (input: string): number | null => {
  const parsedInput = input
    .replace(new RegExp('One', 'ig'), '1')
    .replace(new RegExp('Minute(s)?', 'i'), 'minutes')
    .replace(new RegExp('Second(s)?', 'i'), 'seconds')
    .replace('-', ' ');

  const pattern = '([0-9]+) ?(minutes|seconds)';
  const matches = parsedInput.match(new RegExp(pattern, 'ig'));
  if (!matches) {
    console.log(`failed to parse duration`);
    return null;
  }
  let duration = Duration.fromObject({ seconds: 0 });
  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i].match(pattern);
    if (match && match.length) {
      const timeNumber = parseInt(match[1], 10);
      const unitOfTime = match[2];
      if (unitOfTime === 'minutes') {
        duration = duration.plus({ minutes: timeNumber });
      } else if (unitOfTime === 'seconds') {
        duration = duration.plus({ seconds: timeNumber });
      }
    }
  }
  return duration.as('seconds');
};

const getTimerText = (secondsLeft: number) => {
  const duration = Duration.fromObject({ seconds: secondsLeft });
  return duration.toFormat('mm:ss');
};

export { parseDuration, getTimerText };
