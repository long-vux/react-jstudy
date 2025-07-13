import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/layout/main/MainLayout';
import LessonLayout from '@/components/layout/lesson/LessonLayout';
import HomePage from '@/pages/Home';
import LessonPage from '@/pages/LessonPage';
import ExercisePage from '@/pages/ExercisePage';
import ProfilePage from '@/pages/ProfilePage';

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
    
    <Route path="/lessons" element={<LessonLayout />}>
      <Route path=":slug" element={<LessonPage />} />
    </Route>

    <Route path="/exercise" element={<LessonLayout />}>
      <Route path=":id" element={<ExercisePage />} />
    </Route>
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
);

export default MainRoutes;