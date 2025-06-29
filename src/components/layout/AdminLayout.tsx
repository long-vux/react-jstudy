import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';

// Dummy admin page
const AdminDashboard = () => <div>Admin Dashboard</div>;

const AdminRoutes = () => (
  <Routes>
    <Route element={<AdminLayout />}>
      <Route path="/admin" element={<AdminDashboard />} />
      {/* Thêm các route admin khác ở đây */}
    </Route>
  </Routes>
);

export default AdminRoutes;