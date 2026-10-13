import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './pin.css';

export default function PinGate({ children, title = 'Acceso restringido' }) {
  const { isAuthenticated, login } = useAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(pin);
    if (!result.ok) {
      setError('PIN incorrecto. Intenta de nuevo.');
      setPin('');
    }
  };

  return (
    <div className="pin-gate">
      <div className="pin-gate__card">
        <h3>🔒 {title}</h3>
        <p className="pin-gate__desc">
          Esta sección contiene información médica. Confirma tu identidad como tutor.
        </p>
        <p className="pin-gate__hint">
          Demo: PIN <code>1234</code> <span className="demo-badge">Demostrativo</span>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            placeholder="••••"
            className="pin-gate__input"
            autoFocus
          />
          {error && <p className="pin-gate__error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={pin.length < 4}>
            Desbloquear
          </button>
        </form>
      </div>
    </div>
  );
}