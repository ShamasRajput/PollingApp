import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../constants';
import { AuthService } from '../services';

export default function LoginForm({ onLogin }) {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const onFinish = async (values) => {
    setLoading(true)
    const response = await AuthService.loginPost(values)
    setLoading(false)
    if (response?.success ?? false) {
      onLogin();
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', ROLES.ADMIN)
      navigate('/dashboard');
    }
  };

  return (
    <Form
      name="loginForm"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
