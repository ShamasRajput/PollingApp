import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { AuthService } from '../services';

export default function SignUpForm() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true)
        const response = await AuthService.signUpPost(values)
        setLoading(false)
        if (response?.success ?? false) {
            navigate('/login');
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
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Please enter your name!' },
                ]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>
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
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Signup
                </Button>
            </Form.Item>
            <Form.Item>
                <div style={{ textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </Form.Item>
        </Form>
    );
}
