import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/insulina', label: 'Insulina'},
  { to: '/comidas', label: 'Comidas'},
  { to: '/alimentos', label: 'Alimentos' },
  { to: '/perfil', label: 'Perfil'},
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">🩸</span>
        <h1 className="sidebar__title">Insu</h1>
      </div>

      <nav className="sidebar__nav">
        {links.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <span className="sidebar__icon">{icon}</span>
            <span className="sidebar__label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p>Apoyo DT1</p>
      </div>
    </aside>
  );
}