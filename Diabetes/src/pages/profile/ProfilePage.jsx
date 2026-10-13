import { Link } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '../../context/AuthContext';
import ProfileCard from '../../components/profile/ProfileCard';
import TutorContacts from '../../components/profile/Tutor';
import PinGate from '../../components/profile/pin';
import './ProfilePage.css';

export default function ProfilePage() {
  const { profile } = useProfile();
  const { session, logout } = useAuth();

  return (
    <PinGate title="Perfil del usuario">
      <div className="profile-page">
        <header className="profile-page__header">
          <div>
            <h2>👤 Perfil</h2>
            <p>
              Sesión: <strong>{session?.name}</strong> ({session?.role}){' '}
              <button className="link-btn" onClick={logout}>Cerrar sesión</button>
            </p>
          </div>
          <Link to="/perfil/info-medica" className="btn-primary">
            🩺 Ver información médica →
          </Link>
        </header>

        <div className="profile-page__grid">
          <ProfileCard profile={profile} />
          <TutorContacts tutors={profile.tutors} />
        </div>

        <p className="profile-page__note">
          Datos demostrativos. En producción, esta sección debe servirse desde un backend
          con cifrado en reposo y control de acceso por rol.
        </p>
      </div>
    </PinGate>
  );
}