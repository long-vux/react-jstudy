// === src/pages/VerifyEmailHandler.tsx ===
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Result, Button, Typography, Spin } from 'antd';

const { Title, Paragraph } = Typography;

const VerifyEmailHandler = () => {
  const { userId, code } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; 

  const [status, setStatus] = useState<'pending' | 'success' | 'fail'>('pending');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(`${API_URL}/auth/verify-email`, {
          userId,
          verificationCode: code,
        });

        if (res.data?.message) {
          setStatus('success');
        } else {
          setStatus('fail');
        }
      } catch (error) {
        setStatus('fail');
      }
    };

    if (userId && code) {
      verifyEmail();
    }
  }, [userId, code]);

  if (status === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Result
        status={status === 'success' ? 'success' : 'error'}
        title={
          <Title level={2}>
            {status === 'success' ? 'Xác minh email thành công!' : 'Xác minh thất bại'}
          </Title>
        }
        subTitle={
          <Paragraph type="secondary">
            {status === 'success'
              ? 'Bây giờ bạn có thể đăng nhập vào nền tảng.'
              : 'Đường dẫn xác minh không hợp lệ hoặc đã hết hạn.'}
          </Paragraph>
        }
        extra={
          <Button type="primary" onClick={() => navigate('/login')}>
            Đến trang đăng nhập
          </Button>
        }
      />
    </div>
  );
};

export default VerifyEmailHandler;
