import React, { useState } from 'react';
import { Button, Card, Typography, Row, Col } from 'antd';
import { GoogleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { login } from '@/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Row justify="center" className="w-full">
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Card className="shadow-2xl border-0" style={{ borderRadius: '16px' }}>
            <div className="text-center mb-8">
              <Title level={2}>Chào mừng trở lại! 👋</Title>
              <Text type="secondary"> Đăng nhập vào tài khoản của bạn để tiếp tục </Text>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Nhập tên đăng nhập hoặc email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg pr-10"
                />
                <span
                  className="absolute right-3 top-7 cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              {error && <Text type="danger">{error}</Text>}
              <div className="flex justify-between items-center">
                  <a href="/reset-password" className="text-blue-600 hover:underline">
                    Quên mật khẩu?
                  </a>
                  <a href="/register" className="text-blue-600 hover:underline">
                    Đăng ký tài khoản mới
                  </a>
                </div>
              <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out" type="primary" htmlType="submit" block loading={loading}>
                Đăng nhập
              </Button>
            </form>

            {/* divider  */}
            <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="mx-4 text-gray-500">hoặc</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

             <Button
                icon={<GoogleOutlined />}
                // onClick={() => handleSocialLogin('google')}
                block
                size="large"
                className="h-12 border-red-200 text-red-600 hover:border-red-400 hover:text-red-700"
                style={{ borderRadius: '8px' }}
              >
                Tiếp tục với Google
              </Button>
            
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;