import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(authService.getSession());

  // Revalida la sesión cada 60seg
  useEffect(() => {
    const interval = setInterval(() => {
      setSession(authService.getSession());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const login = useCallback((pin) => {
    const result = authService.login(pin);
    if (result.ok) setSession(result.session);
    return result;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  const refresh = useCallback(() => {
    setSession(authService.refreshSession());
  }, []);

  return (
    <AuthContext.Provider value={{ session, login, logout, refresh, isAuthenticated: Boolean(session) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}