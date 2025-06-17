import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {

  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Login submitted:', values);
    navigate('/dashboard');

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
