import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from 'antd';
import axios from 'axios';
import {toast} from 'react-toastify';

const { Title } = Typography;

const ResetPasswordPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;


    const handleReset = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/auth/reset-password/${userId}`, {
                otp,
                newPassword,
            });
            toast.success(res.data.message || 'Đặt lại mật khẩu thành công!');
            // set time out to allow user to read the message
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Lỗi đặt lại mật khẩu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <Card className="w-full max-w-md">
                <Title level={3}>Đặt lại mật khẩu</Title>
                <Input
                    placeholder="Nhập mã OTP từ email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="my-2 w-full px-4 py-2 border rounded-lg"
                />
                <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="my-2 w-full px-4 py-2 border rounded-lg"
                />
                <Button className='mt-2 h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out' type="primary" block onClick={handleReset} loading={loading}>
                    Đặt lại mật khẩu
                </Button>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;
