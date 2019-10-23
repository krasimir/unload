import { clock } from '../../state';

import { weekDay, getMonth, toString } from './utils/dateHelpers';

export default function manageClock({ data, state }) {
  const date = clock.map(date => ({
    time: `${ toString(date.getHours()) }:${ toString(date.getMinutes()) }`,
    day: `${ date.getDate() } (${ weekDay(date.getDay()) }) ${ getMonth(date.getMonth()) } ${ date.getFullYear() }`
  }));
  const setDate = clock.mutate();

  data({ date });
  setInterval(() => {
    setDate(new Date());
  }, 30000);
};
