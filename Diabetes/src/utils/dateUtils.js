export function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-');
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('es-MX', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export function nowHHMM() {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
}

export function isSameMinute(a, b) {
  // a y b son strings "YYYY-MM-DD" y "HH:MM"
  return a.date === b.date && a.time === b.time;
}