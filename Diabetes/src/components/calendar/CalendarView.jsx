import './CalendarView.css';

const WEEK_DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function toISO(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function CalendarView({
  selectedDate,
  onSelectDate,
  markedDates = [],
  monthCursor,
  onMonthChange,
}) {
  const year = monthCursor.getFullYear();
  const month = monthCursor.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7; // lunes primero

  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const todayISO = new Date().toISOString().slice(0, 10);
  const markedSet = new Set(markedDates);

  const goPrev = () => onMonthChange(new Date(year, month - 1, 1));
  const goNext = () => onMonthChange(new Date(year, month + 1, 1));
  const goToday = () => onMonthChange(new Date());

  return (
    <div className="calendar-view">
      <div className="calendar-view__header">
        <button className="calendar-view__nav" onClick={goPrev} aria-label="Mes anterior">
          ‹
        </button>
        <div className="calendar-view__title">
          {MONTHS[month]} {year}
        </div>
        <button className="calendar-view__nav" onClick={goNext} aria-label="Mes siguiente">
          ›
        </button>
      </div>

      <div className="calendar-view__grid">
        {WEEK_DAYS.map((d, i) => (
          <span key={i} className="calendar-view__weekday">{d}</span>
        ))}

        {cells.map((day, i) => {
          if (day === null) return <span key={i} className="calendar-view__empty" />;

          const iso = toISO(year, month, day);
          const isSelected = iso === selectedDate;
          const isToday = iso === todayISO;
          const isMarked = markedSet.has(iso);

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectDate(iso)}
              className={[
                'calendar-view__day',
                isSelected ? 'calendar-view__day--selected' : '',
                isToday ? 'calendar-view__day--today' : '',
                isMarked ? 'calendar-view__day--marked' : '',
              ].join(' ')}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="calendar-view__footer">
        <button type="button" className="link-btn" onClick={goToday}>
          Ir a hoy
        </button>
        <span className="calendar-view__legend">
          <span className="dot dot--marked" /> Con registros
        </span>
      </div>
    </div>
  );
}