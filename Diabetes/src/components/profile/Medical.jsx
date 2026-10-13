import './medical.css';

export default function MedicalInfoSection({
  medicalInfo,
  careInstructions,
  emergencyContact,
  onChange,
  onEmergencyChange,
  onAddInstruction,
  onRemoveInstruction,
  newInstruction,
  setNewInstruction,
}) {
  const handleField = (key) => (e) => onChange({ [key]: e.target.value });
  const handleEmergency = (key) => (e) =>
    onEmergencyChange({ ...emergencyContact, [key]: e.target.value });

  const handleAddInstruction = () => {
    const text = newInstruction.trim();
    if (!text) return;
    onAddInstruction(text);
    setNewInstruction('');
  };

  return (
    <div className="medical-info">
      <section className="medical-info__block">
        <h3>Antecedentes</h3>

        <label>
          Alergias
          <input value={medicalInfo.allergies} onChange={handleField('allergies')} />
        </label>

        <label>
          Condiciones crónicas
          <input value={medicalInfo.chronicConditions} onChange={handleField('chronicConditions')} />
        </label>

        <label>
          Medicación actual
          <input value={medicalInfo.currentMedication} onChange={handleField('currentMedication')} />
        </label>

        <label>
          Notas
          <textarea rows="2" value={medicalInfo.notes} onChange={handleField('notes')} />
        </label>
      </section>

      <section className="medical-info__block">
        <h3>Indicaciones de cuidado</h3>

        <ul className="medical-info__instructions">
          {careInstructions.map((text, i) => (
            <li key={i}>
              <span>{text}</span>
              <button
                type="button"
                className="icon-btn icon-btn--danger"
                onClick={() => onRemoveInstruction(i)}
                title="Eliminar"
              >
                ✕
              </button>
            </li>
          ))}
          {careInstructions.length === 0 && (
            <li className="medical-info__empty">Sin indicaciones registradas.</li>
          )}
        </ul>

        <div className="medical-info__add">
          <input
            value={newInstruction}
            onChange={(e) => setNewInstruction(e.target.value)}
            placeholder="Añadir indicación..."
            onKeyDown={(e) => e.key === 'Enter' && handleAddInstruction()}
          />
          <button type="button" className="btn-primary" onClick={handleAddInstruction}>
            Añadir
          </button>
        </div>
      </section>

      <section className="medical-info__block">
        <h3>Contacto de emergencia</h3>

        <label>
          Nombre
          <input value={emergencyContact.name} onChange={handleEmergency('name')} />
        </label>

        <label>
          Relación
          <input value={emergencyContact.relationship} onChange={handleEmergency('relationship')} />
        </label>

        <label>
          Teléfono
          <input value={emergencyContact.phone} onChange={handleEmergency('phone')} />
        </label>
      </section>
    </div>
  );
}