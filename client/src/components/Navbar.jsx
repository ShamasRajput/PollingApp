import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center w-full">
      <h1 className="text-xl font-bold">Poll App</h1>
      <Link to="/login">
        <Button>
          Login
        </Button>
      </Link>
    </nav>
  );
}
