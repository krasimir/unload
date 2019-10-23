const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

export function toString(n) {
  if (n < 10) return '0' + n;
  return '' + n;
}
export function weekDay(day) {
  return days[day];
}
export function getMonth(m) {
  return months[m];
}
