import { useState } from 'react';
import { Button, Card, Input, Typography } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import BackHomeButton from '@/components/ui/BackHomeButton'; 

const { Title } = Typography;

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      toast.success(res.data.message || 'OTP đã được gửi đến email của bạn');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Lỗi khi gửi OTP';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <BackHomeButton />

      <Card className="w-full max-w-md">
        <Title level={3}>Quên mật khẩu</Title>
        <p>Nhập email đã đăng ký để nhận mã OTP.</p>
        <Input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-4 w-full px-4 py-2 border rounded-lg"
        />
        <Button className=" h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out" type="primary" block onClick={handleSubmit} loading={loading}>
          Gửi OTP
        </Button>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;