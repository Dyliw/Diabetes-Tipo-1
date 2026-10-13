import './MiniCalendar.css';

const WEEK_DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export default function MiniCalendar({ markedDays }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();

  const firstDay = new Date(year, month, 1).getDay(); // 0 = domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7; // lunes como primer día

  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthName = today.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });

  return (
    <article className="card mini-calendar">
      <h3 className="card__title">📅 Calendario</h3>
      <p className="mini-calendar__month">{monthName}</p>

      <div className="mini-calendar__grid">
        {WEEK_DAYS.map((d, i) => (
          <span key={i} className="mini-calendar__weekday">{d}</span>
        ))}

        {cells.map((day, i) => {
          if (day === null) return <span key={i} className="mini-calendar__empty" />;
          const isMarked = markedDays.includes(day);
          const isToday = day === todayDate;
          return (
            <span
              key={i}
              className={[
                'mini-calendar__day',
                isMarked ? 'mini-calendar__day--marked' : '',
                isToday ? 'mini-calendar__day--today' : '',
              ].join(' ')}
            >
              {day}
            </span>
          );
        })}
      </div>

      <p className="mini-calendar__legend">
        <span className="dot dot--marked" /> Días con registros (demo)
      </p>
    </article>
  );
}