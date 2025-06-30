import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/layout/main/MainLayout';
import LessonLayout from '@/components/layout/lesson/LessonLayout';
import HomePage from '@/pages/Home';
import LessonPage from '@/pages/LessonPage';


const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
    
    <Route path="/lessons" element={<LessonLayout />}>
      <Route path=":slug" element={<LessonPage />} />
    </Route>

  </Routes>
);

export default MainRoutes;