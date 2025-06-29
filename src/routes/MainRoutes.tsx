import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/layout/main/MainLayout';
import HomePage from '@/pages/Home';


const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  </Routes>
);

export default MainRoutes;