const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

function toString(n) {
  if (n < 10) return '0' + n;
  return '' + n;
}
function weekDay(day) {
  return days[day];
}
function getMonth(m) {
  return months[m];
}

export default function clock({ data, state }) {
  const d = state(new Date());
  const date = d.map(date => ({
    time: `${ toString(date.getHours()) }:${ toString(date.getMinutes()) }`,
    day: `${ date.getDate() } (${ weekDay(date.getDay()) }) ${ getMonth(date.getMonth()) } ${ date.getFullYear() }`
  }));
  const setDate = d.mutate();

  data({ date });
  setInterval(() => {
    setDate(new Date());
  }, 30000);
};
