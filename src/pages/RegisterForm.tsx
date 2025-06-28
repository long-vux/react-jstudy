// === src/features/user/RegisterForm.tsx ===
import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Row, Col, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { register } from '@/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, registerMessage } = useAppSelector((state) => state.user);

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(register({ fullName, email, password, username }));
        if (register.fulfilled.match(result)) {
            message.success(result.payload);
            navigate('/login');
        }
    };

    useEffect(() => {
        if (registerMessage) {
            toast.success(registerMessage);
            navigate('/login');
        }
    }, [registerMessage, navigate]);

    useEffect(() => {
        if (error) message.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Row justify="center" className="w-full">
                <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                    <Card className="shadow-2xl border-0" style={{ borderRadius: '16px' }}>
                        <div className="text-center mb-8">
                            <Title level={2}>Đăng ký tài khoản mới</Title>
                            <Text type="secondary">Vui lòng điền đầy đủ thông tin bên dưới</Text>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                                <input
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên đăng nhập"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Nhập email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                            {error && <Text type="danger">{error}</Text>}
                            {registerMessage && <Text type="success">{registerMessage}</Text>}
                            <div className="flex justify-between items-center">
                                <a href="/reset-password" className="text-blue-600 hover:underline">
                                    Quên mật khẩu?
                                </a>
                                <a href="/login" className="text-blue-600 hover:underline">
                                    Bạn đã có tài khoản?
                                </a>
                            </div>
                            <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out" type="primary" htmlType="submit" block loading={loading}>
                                Đăng ký
                            </Button>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default RegisterForm;
