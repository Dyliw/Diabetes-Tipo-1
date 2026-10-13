import { useState, useCallback, useMemo } from 'react';
import initialData from '../data/insulinRecords.json';

const STORAGE_KEY = 'diacare_insulin_records';

function loadRecords() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('No se pudo cargar el historial guardado:', e);
  }
  return initialData.records;
}

function persistRecords(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.warn('No se pudo guardar el historial:', e);
  }
}

export function useInsulinRecords() {
  const [records, setRecords] = useState(loadRecords);

  const update = useCallback((updater) => {
    setRecords((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      persistRecords(next);
      return next;
    });
  }, []);

  /** Verifica si ya existe un registro con misma fecha y hora (± mismo minuto) */
  const findDuplicate = useCallback(
    (date, time, ignoreId = null) =>
      records.find(
        (r) =>
          r.date === date &&
          r.time === time &&
          r.id !== ignoreId &&
          r.status !== 'cancelled'
      ),
    [records]
  );

  const addRecord = useCallback(
    (record) => {
      const dup = findDuplicate(record.date, record.time);
      if (dup) {
        return { ok: false, reason: 'duplicate', duplicate: dup };
      }

      const now = new Date().toISOString();
      const newRecord = {
        id: `rec-${Date.now()}`,
        status: 'applied',
        source: 'manual',
        observations: '',
        ...record,
        createdAt: now,
        updatedAt: now,
      };

      update((prev) => [newRecord, ...prev]);
      return { ok: true, record: newRecord };
    },
    [findDuplicate, update]
  );

  const updateRecord = useCallback(
    (id, changes) => {
      const existing = records.find((r) => r.id === id);
      if (!existing) return { ok: false, reason: 'not-found' };

      const newDate = changes.date ?? existing.date;
      const newTime = changes.time ?? existing.time;

      const dup = findDuplicate(newDate, newTime, id);
      if (dup) {
        return { ok: false, reason: 'duplicate', duplicate: dup };
      }

      update((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                ...changes,
                status: r.status === 'applied' ? 'corrected' : r.status,
                updatedAt: new Date().toISOString(),
              }
            : r
        )
      );
      return { ok: true };
    },
    [records, findDuplicate, update]
  );

  const cancelRecord = useCallback(
    (id) => {
      update((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: 'cancelled', updatedAt: new Date().toISOString() }
            : r
        )
      );
    },
    [update]
  );

  const sortedRecords = useMemo(
    () =>
      [...records].sort((a, b) =>
        `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`)
      ),
    [records]
  );

  return {
    records: sortedRecords,
    addRecord,
    updateRecord,
    cancelRecord,
    findDuplicate,
  };
}