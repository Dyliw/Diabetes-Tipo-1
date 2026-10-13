import { useRef, useState } from 'react';
import InsulinRecordForm from '../../components/insulin/InsulinForm';
import InsulinHistoryList from '../../components/insulin/InsulinHistory';
import { useInsulinRecords } from '../../hooks/useInsulinRecords';
import './InsulinPage.css';

export default function InsulinPage() {
  const { records, addRecord, updateRecord, cancelRecord } = useInsulinRecords();
  const [editingRecord, setEditingRecord] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = (payload) => {
    if (editingRecord) {
      const result = updateRecord(editingRecord.id, payload);
      if (result.ok) setEditingRecord(null);
      return result;
    }
    return addRecord(payload);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancelEdit = () => setEditingRecord(null);

  const handleCancelRecord = (id) => {
    const confirm = window.confirm(
      '¿Anular este registro? Se marcará como cancelado pero no se eliminará del historial.'
    );
    if (confirm) cancelRecord(id);
  };

  return (
    <div className="insulin-page">
      <header className="insulin-page__header">
        <h2>Registro de insulina</h2>
        <p>
          Registra aplicaciones manualmente y consulta el historial cronológico.{' '}
          <span className="demo-badge">Demostrativo</span>
        </p>
      </header>

      <div className="insulin-page__grid">
        <div ref={formRef}>
          <InsulinRecordForm
            onSubmit={handleSubmit}
            editingRecord={editingRecord}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <InsulinHistoryList
          records={records}
          onEdit={handleEdit}
          onCancel={handleCancelRecord}
        />
      </div>
    </div>
  );
}