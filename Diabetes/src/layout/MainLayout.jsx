import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}