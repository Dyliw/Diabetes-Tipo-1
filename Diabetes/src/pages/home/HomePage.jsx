import { Link } from 'react-router-dom';
import DailySummary from '../../components/home/DailySummary';
import InsulinQuickAccess from '../../components/home/InsulinQuick';
import MiniCalendar from '../../components/home/MiniCalendar';
import InfoCard from '../../components/home/InfoCard';
import { demoUser, demoDailySummary, demoInsulinHistory, demoMarkedDays, demoInfoCard } from '../../utils/mockData';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home">
      <header className="home__header">
        <div>
          <h2>¡Hola, {demoUser.name.split(' ')[0]}!</h2>
          <p className="home__subtitle">
            Este es tu resumen del día. <span className="demo-badge">Demostrativo</span>
          </p>
        </div>
        <Link to="/perfil" className="home__profile-link">
          👤 Ver perfil
        </Link>
      </header>

      <section className="home__grid">
        <DailySummary data={demoDailySummary} />
        <InsulinQuickAccess lastRecord={demoInsulinHistory[0]} history={demoInsulinHistory} />
        <MiniCalendar markedDays={demoMarkedDays} />
        <InfoCard data={demoInfoCard} />
      </section>
    </div>
  );
}