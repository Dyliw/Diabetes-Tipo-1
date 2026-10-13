import { formatDate } from '../../utils/dateUtils';
import './InsulinHistory.css';

const STATUS_LABELS = {
  applied: { label: 'Aplicada', className: 'status--applied' },
  pending: { label: 'Pendiente', className: 'status--pending' },
  corrected: { label: 'Corregida', className: 'status--corrected' },
  cancelled: { label: 'Anulada', className: 'status--cancelled' },
};

const SOURCE_LABELS = {
  manual: '✍️ Manual',
  nfc: '📡 NFC',
};

export default function InsulinHistoryList({ records, onEdit, onCancel }) {
  if (!records.length) {
    return (
      <div className="history-empty">
        <p>No hay registros de insulina.</p>
        <p className="history-empty__hint">Agrega el primero con el formulario.</p>
      </div>
    );
  }

  // Agrupar por fecha
  const grouped = records.reduce((acc, r) => {
    (acc[r.date] ||= []).push(r);
    return acc;
  }, {});

  return (
    <div className="history">
      <h3 className="history__title">
        Historial <span className="demo-badge">Demostrativo</span>
      </h3>

      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="history__group">
          <p className="history__date">{formatDate(date)}</p>

          <ul className="history__list">
            {items.map((r) => {
              const status = STATUS_LABELS[r.status] || STATUS_LABELS.pending;
              return (
                <li
                  key={r.id}
                  className={`history__item ${r.status === 'cancelled' ? 'history__item--cancelled' : ''}`}
                >
                  <div className="history__time">
                    <span className="history__clock">{r.time}</span>
                    <span className={`history__status ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <div className="history__details">
                    <p className="history__dose">
                      {r.dose != null ? `${r.dose} UI` : 'Dosis no especificada'}
                      {r.insulinType && <span className="history__type"> · {r.insulinType}</span>}
                    </p>
                    <p className="history__meta">
                      {SOURCE_LABELS[r.source] || r.source}
                      {r.updatedAt !== r.createdAt && ' · editado'}
                    </p>
                    {r.observations && (
                      <p className="history__obs">💬 {r.observations}</p>
                    )}
                  </div>

                  <div className="history__actions">
                    <button
                      className="icon-btn"
                      title="Editar registro"
                      onClick={() => onEdit(r)}
                      disabled={r.status === 'cancelled'}
                    >
                      ✏️
                    </button>
                    <button
                      className="icon-btn icon-btn--danger"
                      title="Anular registro"
                      onClick={() => onCancel(r.id)}
                      disabled={r.status === 'cancelled'}
                    >
                      🚫
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}