import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout } from '@/features/user/userSlice';

const Header = () => {
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/auth/login');
    };

    // Sử dụng dạng items cho Dropdown
    const dropdownMenuItems = [
        {
            key: 'profile',
            label: <Link to="/profile">Trang cá nhân</Link>,
        },
        {
            key: 'logout',
            label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
    ];

    return (
        <header className="bg-white shadow px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-pink-600">JStudy - Nền tảng học JavaScript</Link>

            {/* Search bar */}
            <div className="flex-1 mx-6 max-w-xl">
                <Input.Search
                    placeholder="Tìm kiếm bài học..."
                    allowClear
                    onSearch={(value) => navigate(`/search?q=${value}`)}
                />
            </div>

            {/* Right side: Auth */}
            {user ? (
                <div className="flex items-center gap-4">
                    <Button type="primary" onClick={() => navigate('/lessons')}>
                        Bắt đầu học
                    </Button>
                    <Dropdown menu={{ items: dropdownMenuItems }} placement="bottomRight">
                        <Avatar
                            icon={<UserOutlined />}
                            src={user.profile?.avatar}
                            className="cursor-pointer"
                        />
                    </Dropdown>
                </div>
            ) : (
                <div className="flex gap-2">
                    <Button onClick={() => navigate('/auth/login')}>Đăng nhập</Button>
                    <Button type="primary" onClick={() => navigate('/auth/register')}>
                        Đăng ký
                    </Button>
                </div>
            )}
        </header>
    );
};

export default Header;