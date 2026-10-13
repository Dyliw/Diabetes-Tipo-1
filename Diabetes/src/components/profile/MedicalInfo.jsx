import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import MedicalInfoSection from '../../components/profile/Medical';
import PinGate from '../../components/profile/pin';
import { exportAllData } from '../../services/storageService';
import './MedicalInfo.css';

export default function MedicalInfoPage() {
  const {
    profile,
    updateMedicalInfo,
    updateEmergencyContact,
    addCareInstruction,
    removeCareInstruction,
  } = useProfile();

  const [newInstruction, setNewInstruction] = useState('');

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diacare-respaldo-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PinGate title="Información médica">
      <div className="medical-page">
        <header className="medical-page__header">
          <div>
            <h2>🩺 Información médica</h2>
            <p>
              Edita y consulta los datos de seguimiento.{' '}
              <span className="demo-badge">Demostrativo</span>
            </p>
          </div>
          <div className="medical-page__actions">
            <Link to="/perfil" className="btn-secondary">← Volver</Link>
            <button className="btn-secondary" onClick={handleExport}>
              ⬇️ Exportar datos
            </button>
          </div>
        </header>

        <MedicalInfoSection
          medicalInfo={profile.medicalInfo}
          careInstructions={profile.careInstructions}
          emergencyContact={profile.emergencyContact}
          onChange={updateMedicalInfo}
          onEmergencyChange={updateEmergencyContact}
          onAddInstruction={addCareInstruction}
          onRemoveInstruction={removeCareInstruction}
          newInstruction={newInstruction}
          setNewInstruction={setNewInstruction}
        />

        <p className="medical-page__note">
          En producción
        </p>
      </div>
    </PinGate>
  );
}