// import React, { useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Divider, Card, Space,Typography, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { Helmet } from 'react-helmet-async';
// import toast from 'react-hot-toast';

// import { RootState } from '@/store';
// import { useLoginMutation, useSocialLoginMutation } from '@/store/api/authApi';
// import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
// import { initializeGoogleAuth, initializeFacebookAuth, initializeGithubAuth } from '@/services/socialAuth';
// import { LoginCredentials } from '@/types/auth';

const { Title, Text } = Typography;

// const LoginPage: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [form] = Form.useForm();

//   const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);
//   const [login] = useLoginMutation();
//   const [socialLogin] = useSocialLoginMutation();

//   const from = (location.state as any)?.from?.pathname || '/dashboard';

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate(from, { replace: true });
//     }
//   }, [isAuthenticated, navigate, from]);

//   const handleLogin = async (values: LoginCredentials) => {
//     try {
//       dispatch(loginStart());
//       const result = await login(values).unwrap();
//       dispatch(loginSuccess(result));
//       toast.success('Đăng nhập thành công!');
//       navigate(from, { replace: true });
//     } catch (error: any) {
//       dispatch(loginFailure(error.data?.message || 'Đăng nhập thất bại'));
//       toast.error(error.data?.message || 'Đăng nhập thất bại');
//     }
//   };

//   const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
//     try {
//       dispatch(loginStart());
//       let token: string;

//       switch (provider) {
//         case 'google':
//           token = await initializeGoogleAuth();
//           break;
//         case 'facebook':
//           token = await initializeFacebookAuth();
//           break;
//         case 'github':
//           token = await initializeGithubAuth();
//           break;
//         default:
//           throw new Error('Provider không được hỗ trợ');
//       }

//       const result = await socialLogin({ provider, token }).unwrap();
//       dispatch(loginSuccess(result));
//       toast.success(`Đăng nhập với ${provider} thành công!`);
//       navigate(from, { replace: true });
//     } catch (error: any) {
//       dispatch(loginFailure(error.message || `Đăng nhập với ${provider} thất bại`));
//       toast.error(error.message || `Đăng nhập với ${provider} thất bại`);
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Đăng nhập - {import.meta.env.VITE_APP_NAME}</title>
//         <meta name="description" content="Đăng nhập vào tài khoản của bạn" />
//       </Helmet>

//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <Row justify="center" className="w-full">
//           <Col xs={24} sm={20} md={16} lg={12} xl={8}>
//             <Card 
//               className="shadow-2xl border-0"
//               style={{ borderRadius: '16px' }}
//             >
//               <div className="text-center mb-8">
//                 <Title level={2} className="mb-2">
//                   Chào mừng trở lại! 👋
//                 </Title>
//                 <Text type="secondary" className="text-base">
//                   Đăng nhập vào tài khoản của bạn để tiếp tục
//                 </Text>
//               </div>

//               <Form
//                 form={form}
//                 name="login"
//                 onFinish={handleLogin}
//                 layout="vertical"
//                 size="large"
//                 requiredMark={false}
//               >
//                 <Form.Item
//                   name="email"
//                   label="Email"
//                   rules={[
//                     { required: true, message: 'Vui lòng nhập email!' },
//                     { type: 'email', message: 'Email không hợp lệ!' },
//                   ]}
//                 >
//                   <Input
//                     prefix={<UserOutlined />}
//                     placeholder="Nhập email của bạn"
//                     autoComplete="email"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="password"
//                   label="Mật khẩu"
//                   rules={[
//                     { required: true, message: 'Vui lòng nhập mật khẩu!' },
//                     { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
//                   ]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined />}
//                     placeholder="Nhập mật khẩu của bạn"
//                     autoComplete="current-password"
//                   />
//                 </Form.Item>

//                 <Form.Item className="mb-6">
//                   <div className="flex justify-between items-center">
//                     <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">
//                       Quên mật khẩu?
//                     </Link>
//                   </div>
//                 </Form.Item>

//                 <Form.Item className="mb-6">
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     loading={isLoading}
//                     block
//                     className="h-12 text-base font-medium"
//                     style={{ borderRadius: '8px' }}
//                   >
//                     Đăng nhập
//                   </Button>
//                 </Form.Item>
//               </Form>

//               <Divider className="my-6">
//                 <Text type="secondary">hoặc đăng nhập với</Text>
//               </Divider>

//               <Space direction="vertical" className="w-full" size="middle">
//                 <Button
//                   icon={<GoogleOutlined />}
//                   onClick={() => handleSocialLogin('google')}
//                   loading={isLoading}
//                   block
//                   size="large"
//                   className="h-12 border-red-200 text-red-600 hover:border-red-400 hover:text-red-700"
//                   style={{ borderRadius: '8px' }}
//                 >
//                   Tiếp tục với Google
//                 </Button>

//                 <Button
//                   icon={<FacebookOutlined />}
//                   onClick={() => handleSocialLogin('facebook')}
//                   loading={isLoading}
//                   block
//                   size="large"
//                   className="h-12 border-blue-200 text-blue-600 hover:border-blue-400 hover:text-blue-700"
//                   style={{ borderRadius: '8px' }}
//                 >
//                   Tiếp tục với Facebook
//                 </Button>

//                 <Button
//                   icon={<GithubOutlined />}
//                   onClick={() => handleSocialLogin('github')}
//                   loading={isLoading}
//                   block
//                   size="large"
//                   className="h-12 border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-700"
//                   style={{ borderRadius: '8px' }}
//                 >
//                   Tiếp tục với GitHub
//                 </Button>
//               </Space>

//               <div className="text-center mt-8">
//                 <Text type="secondary">
//                   Chưa có tài khoản?{' '}
//                   <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
//                     Đăng ký ngay
//                   </Link>
//                 </Text>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };

// export default LoginPage;

const Login = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Row justify="center" className="w-full">
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <Card
              className="shadow-2xl border-0"
              style={{ borderRadius: '16px' }}
            >

              <div className="text-center mb-8">
                <Title level={2} className="mb-2">
                  Chào mừng trở lại! 👋
                </Title>
                <Text type="secondary" className="text-base">
                  Đăng nhập vào tài khoản của bạn để tiếp tục
                </Text>
              </div>
              <Space direction="vertical" className="w-full" size="middle">
                <Button
                  icon={<GoogleOutlined />}
                  // onClick={() => handleSocialLogin('google')}
                  // loading={isLoading}
                  block
                  size="large"
                  className="h-12 border-red-200 text-red-600 hover:border-red-400 hover:text-red-700"
                  style={{ borderRadius: '8px' }}
                >
                  Tiếp tục với Google
                </Button>

                <Button
                  icon={<FacebookOutlined />}
                  // onClick={() => handleSocialLogin('facebook')}
                  // loading={isLoading}
                  block
                  size="large"
                  className="h-12 border-blue-200 text-blue-600 hover:border-blue-400 hover:text-blue-700"
                  style={{ borderRadius: '8px' }}
                >
                  Tiếp tục với Facebook
                </Button>

                <Button
                  icon={<GithubOutlined />}
                  // onClick={() => handleSocialLogin('github')}
                  // loading={isLoading}
                  block
                  size="large"
                  className="h-12 border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-700"
                  style={{ borderRadius: '8px' }}
                >
                  Tiếp tục với GitHub
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Login