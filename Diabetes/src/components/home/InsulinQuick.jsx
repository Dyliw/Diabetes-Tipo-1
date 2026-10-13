import { Link } from 'react-router-dom';
import './InsulinQuick.css';

export default function InsulinQuickAccess({ lastRecord, history }) {
  return (
    <article className="card insulin-access">
      <h3 className="card__title">Insulina</h3>

      <div className="insulin-access__last">
        <p className="insulin-access__label">Último registro</p>
        <p className="insulin-access__time">
          {lastRecord.date} · {lastRecord.time}
        </p>
        <p className="insulin-access__dose">
          {lastRecord.dose} — {lastRecord.type}
        </p>
      </div>

      <ul className="insulin-access__list">
        {history.slice(0, 3).map((r) => (
          <li key={r.id}>
            <span>{r.time}</span>
            <span>{r.dose}</span>
          </li>
        ))}
      </ul>

      <Link to="/insulina" className="btn-primary">
        Ver historial completo
      </Link>
    </article>
  );
}