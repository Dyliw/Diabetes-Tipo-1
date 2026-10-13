import { useState, useEffect } from 'react';
import { todayISO, nowHHMM } from '../../utils/dateUtils';
import './InsulinRecords.css';

const INSULIN_TYPES = [
  'Lispro (rápida)',
  'Aspart (rápida)',
  'Glargina (basal)',
  'Detemir (basal)',
  'NPH (intermedia)',
  'Otra',
];

const EMPTY_FORM = {
  date: todayISO(),
  time: nowHHMM(),
  insulinType: '',
  dose: '',
  observations: '',
};

export default function InsulinRecordForm({ onSubmit, editingRecord, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isEditing = Boolean(editingRecord);

  useEffect(() => {
    if (editingRecord) {
      setForm({
        date: editingRecord.date,
        time: editingRecord.time,
        insulinType: editingRecord.insulinType || '',
        dose: editingRecord.dose ?? '',
        observations: editingRecord.observations || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.date || !form.time) {
      setError('La fecha y la hora son obligatorias.');
      return;
    }

    const payload = {
      date: form.date,
      time: form.time,
      insulinType: form.insulinType,
      dose: form.dose === '' ? null : Number(form.dose),
      observations: form.observations.trim(),
    };

    const result = onSubmit(payload);

    if (!result.ok) {
      if (result.reason === 'duplicate') {
        setError(
          `⚠️ Ya existe un registro el ${result.duplicate.date} a las ${result.duplicate.time}. Revisa antes de continuar.`
        );
      } else {
        setError('No se pudo guardar el registro.');
      }
      return;
    }

    setSuccess(isEditing ? 'Registro corregido correctamente.' : 'Registro guardado correctamente.');
    setForm(EMPTY_FORM);
    setTimeout(() => setSuccess(''), 2500);
  };

  return (
    <form className="insulin-form" onSubmit={handleSubmit}>
      <h3 className="insulin-form__title">
        {isEditing ? '✏️ Corregir registro' : '➕ Registrar aplicación de insulina'}
      </h3>
      <p className="insulin-form__note">
        Registro manual — <span className="demo-badge">Demostrativo</span>
      </p>

      <div className="insulin-form__row">
        <label>
          Fecha
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Hora
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="insulin-form__row">
        <label>
          Tipo de insulina
          <select name="insulinType" value={form.insulinType} onChange={handleChange}>
            <option value="">— Sin especificar —</option>
            {INSULIN_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          Dosis (UI)
          <input
            type="number"
            name="dose"
            min="0"
            step="0.5"
            placeholder="Ej. 4"
            value={form.dose}
            onChange={handleChange}
          />
        </label>
      </div>

      <label className="insulin-form__full">
        Observaciones (opcional)
        <textarea
          name="observations"
          rows="2"
          placeholder="Ej. Aplicada antes del desayuno"
          value={form.observations}
          onChange={handleChange}
        />
      </label>

      {error && <p className="insulin-form__error">{error}</p>}
      {success && <p className="insulin-form__success">{success}</p>}

      <div className="insulin-form__actions">
        <button type="submit" className="btn-primary">
          {isEditing ? 'Guardar cambios' : 'Guardar registro'}
        </button>
        {isEditing && (
          <button type="button" className="btn-secondary" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}