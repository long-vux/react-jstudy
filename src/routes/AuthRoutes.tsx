import { Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import VerifyEmailHandler from '@/components/ui/VerifyEmailHandler';
import ForgotPasswordForm from '@/components/form/ForgotPasswordForm';
import ResetPasswordForm from '@/components/form/ResetPasswordForm';

const AuthRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email/:userId/:code" element={<VerifyEmailHandler />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:userId" element={<ResetPasswordForm />} />
    </Routes>
);

export default AuthRoutes;