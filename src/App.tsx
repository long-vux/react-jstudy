import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from '@/pages/Home';
import LoginForm from '@/pages/LoginForm';
import RegisterForm from '@/pages/RegisterForm';
import VerifyEmailHandler from '@/pages/VerifyEmailHandler';

// Configure dayjs
dayjs.locale('vi');

const App: React.FC = () => {
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
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify-email/:userId/:code" element={<VerifyEmailHandler />} />

        {/* Redirect to home if no match */}
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;