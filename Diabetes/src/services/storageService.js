/**
 * storageService — capa de persistencia abstracta.
 *
 * HOY: localStorage (solo demo local).
 * MAÑANA: reemplazar por fetch a un backend con cifrado en reposo,
 * autenticación por token y control de acceso por rol.
 */

const NAMESPACE = 'diacare';
const VERSION = 'v1';

function key(name) {
  return `${NAMESPACE}:${VERSION}:${name}`;
}

// ---- Lectura / escritura genérica ----
export function readStore(name, fallback = null) {
  try {
    const raw = localStorage.getItem(key(name));
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`[storageService] Error leyendo "${name}":`, e);
    return fallback;
  }
}

export function writeStore(name, value) {
  try {
    localStorage.setItem(key(name), JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`[storageService] Error escribiendo "${name}":`, e);
    return false;
  }
}

export function removeStore(name) {
  try {
    localStorage.removeItem(key(name));
    return true;
  } catch (e) {
    console.warn(`[storageService] Error eliminando "${name}":`, e);
    return false;
  }
}

// ---- Datos específicos de la app ----
export const PROFILE_KEY = 'profile';
export const SESSION_KEY = 'session';
export const INSULIN_KEY = 'insulin_records';
export const MEALS_KEY = 'meals_logs';

/**
 * Exporta todos los datos de la app (útil para respaldo manual).
 * En producción esto sería una descarga firmada desde el backend.
 */
export function exportAllData() {
  return {
    profile: readStore(PROFILE_KEY),
    insulin: readStore(INSULIN_KEY),
    meals: readStore(MEALS_KEY),
    exportedAt: new Date().toISOString(),
  };
}

/**
 * Borra todos los datos locales. Útil en logout o "borrar cuenta".
 */
export function clearAllData() {
  [PROFILE_KEY, SESSION_KEY, INSULIN_KEY, MEALS_KEY].forEach(removeStore);
}