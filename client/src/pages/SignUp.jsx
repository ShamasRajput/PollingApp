import { Card } from 'antd';
import SignUpForm from '../components/SignUpForm'

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card title="Login" className="w-full max-w-md shadow-md">
        <SignUpForm />
      </Card>
    </div>
  );
}