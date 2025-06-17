// src/components/LoginForm.tsx
import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { GoogleLogin } from '@react-oauth/google';  // Google OAuth
import FacebookLoginButton from './FacebookLoginButton';  // Facebook OAuth
import GithubLoginButton from './GithubLoginButton';  // GitHub OAuth
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log('Login Success:', values);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', values);
      console.log('Backend response:', data);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const handleGoogleLogin = async (response: any) => {
    console.log('Google login response:', response);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/google', {
        token: response.credential,
      });
      console.log('Google login backend response:', data);
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  return (
    <Row justify="center" style={{ padding: '20px' }}>
      <Col span={8}>
        <Card title="Login" bordered={false} style={{ width: '100%' }}>
          <Form form={form} name="loginForm" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log In
              </Button>
            </Form.Item>
          </Form>

          <div style={{ marginBottom: '10px' }}>
            <GoogleLogin onSuccess={handleGoogleLogin} onError={console.log} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <FacebookLoginButton />
          </div>
          <div>
            <GithubLoginButton />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
