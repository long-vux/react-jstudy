import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainRoutes from '@/routes/MainRoutes';
import AdminRoutes from '@/routes/AdminRoutes';
import AuthRoutes from './routes/AuthRoutes';
import { useAppDispatch } from '@/hooks';
import { fetchUserProfile } from '@/features/user/userSlice';

dayjs.locale('vi');

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Main routes */}
        <Route path="/*" element={<MainRoutes />} />
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* Auth routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;