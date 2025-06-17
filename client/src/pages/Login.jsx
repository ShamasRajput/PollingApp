import LoginForm from '../components/LoginForm';
import { Card } from 'antd';

export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card title="Login" className="w-full max-w-md shadow-md">
        <LoginForm onLogin={onLogin} />
      </Card>
    </div>
  );
}
