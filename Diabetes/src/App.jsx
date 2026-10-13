import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/home/HomePage';
import InsulinPage from './pages/insulin/InsulinPage';
import DailyMealsPage from './pages/meals/DailyMeal';
import FoodLibraryPage from './pages/library/FoodLibraryPage';
import ProfilePage from './pages/profile/ProfilePage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'insulina', element: <InsulinPage /> },
      { path: 'comidas', element: <DailyMealsPage /> },
      { path: 'alimentos', element: <FoodLibraryPage /> },
      { path: 'perfil', element: <ProfilePage /> },
    ],
  },
]
{
    basename: '/Diabetes-Tipo-1',
  }                                  
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
