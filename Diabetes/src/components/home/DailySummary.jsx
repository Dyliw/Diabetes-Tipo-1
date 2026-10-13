import './DailySummary.css';

export default function DailySummary({ data }) {
  const { lastInsulin, mealsRegistered, mealsTotal, nextMeal, glucose } = data;

  return (
    <article className="card daily-summary">
      <h3 className="card__title">Resumen del día</h3>

      <div className="daily-summary__row">
        <span className="daily-summary__label">Última insulina</span>
        <span className="daily-summary__value">
          {lastInsulin.time} · {lastInsulin.dose} ({lastInsulin.type})
        </span>
      </div>
      <p className="daily-summary__status">{lastInsulin.status}</p>

      <div className="daily-summary__row">
        <span className="daily-summary__label">Comidas registradas</span>
        <span className="daily-summary__value">
          {mealsRegistered} / {mealsTotal}
        </span>
      </div>

      <div className="daily-summary__row">
        <span className="daily-summary__label">Próxima comida</span>
        <span className="daily-summary__value">{nextMeal}</span>
      </div>

      <div className="daily-summary__row">
        <span className="daily-summary__label">Glucosa (demo)</span>
        <span className="daily-summary__value daily-summary__value--glucose">{glucose}</span>
      </div>
    </article>
  );
}