/**
 * authService — autenticación simulada del tutor.
 *
 * HOY: PIN local guardado en sessionStorage. Solo demo.
 * MAÑANA: OAuth2 / JWT, refresh tokens, roles (tutor, paciente, médico).
 */

import { readStore, writeStore, removeStore, SESSION_KEY } from './storageService';

const DEMO_PIN = '1234'; // ⚠️ Solo demostración. NUNCA hardcodear en producción.

const SESSION_TTL_MS = 1000 * 60 * 30; // 30 minutos

export function login(pin) {
  if (pin !== DEMO_PIN) {
    return { ok: false, reason: 'invalid-pin' };
  }
  const session = {
    role: 'tutor',
    name: 'Mariana Martínez',
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
  writeStore(SESSION_KEY, session);
  return { ok: true, session };
}

export function logout() {
  removeStore(SESSION_KEY);
}

export function getSession() {
  const session = readStore(SESSION_KEY);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    removeStore(SESSION_KEY);
    return null;
  }
  return session;
}

export function isAuthenticated() {
  return Boolean(getSession());
}

export function refreshSession() {
  const session = getSession();
  if (!session) return null;
  const refreshed = { ...session, expiresAt: Date.now() + SESSION_TTL_MS };
  writeStore(SESSION_KEY, refreshed);
  return refreshed;
}