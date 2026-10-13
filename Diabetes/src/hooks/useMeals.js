import { useCallback, useEffect, useMemo, useState } from 'react';
import initialData from '../data/meals.json';

const STORAGE_KEY = 'diacare_meals_logs';

function loadLogs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('No se pudo cargar el registro de comidas:', e);
  }
  return initialData.dailyLogs;
}

function persistLogs(logs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (e) {
    console.warn('No se pudo guardar el registro de comidas:', e);
  }
}

const EMPTY_DAY = { breakfast: [], lunch: [], dinner: [], supper: [] };

export function useMeals() {
  const [logs, setLogs] = useState(loadLogs);

  useEffect(() => {
    persistLogs(logs);
  }, [logs]);

  const mealTypes = initialData.meta.mealTypes;

  /** Devuelve el registro del día (o un día vacío si no existe). */
  const getDay = useCallback(
    (date) => logs[date] ?? EMPTY_DAY,
    [logs]
  );

  /** Añade un alimento a un slot del día. Evita duplicados por foodId en el mismo slot. */
  const addFoodToSlot = useCallback((date, slotId, food) => {
    setLogs((prev) => {
      const day = prev[date] ?? { ...EMPTY_DAY };
      const slot = day[slotId] ?? [];
      if (slot.some((f) => f.foodId === food.id)) return prev;

      return {
        ...prev,
        [date]: {
          ...day,
          [slotId]: [...slot, { foodId: food.id, name: food.name, emoji: food.emoji }],
        },
      };
    });
  }, []);

  /** Elimina un alimento de un slot por foodId. */
  const removeFoodFromSlot = useCallback((date, slotId, foodId) => {
    setLogs((prev) => {
      const day = prev[date];
      if (!day) return prev;
      return {
        ...prev,
        [date]: {
          ...day,
          [slotId]: day[slotId].filter((f) => f.foodId !== foodId),
        },
      };
    });
  }, []);

  /** Limpia un slot completo. */
  const clearSlot = useCallback((date, slotId) => {
    setLogs((prev) => {
      const day = prev[date];
      if (!day) return prev;
      return {
        ...prev,
        [date]: { ...day, [slotId]: [] },
      };
    });
  }, []);

  /** Días que tienen al menos un alimento registrado (para el calendario). */
  const markedDays = useMemo(
    () =>
      Object.entries(logs)
        .filter(([, day]) =>
          Object.values(day).some((slot) => slot.length > 0)
        )
        .map(([date]) => date),
    [logs]
  );

  return {
    logs,
    mealTypes,
    getDay,
    addFoodToSlot,
    removeFoodFromSlot,
    clearSlot,
    markedDays,
  };
}