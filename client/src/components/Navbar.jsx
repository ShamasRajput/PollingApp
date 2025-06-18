import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '../constants';

export default function Navbar() {
  const role = localStorage.getItem('role')
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  }

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center w-full">
      <h1 className="text-xl font-bold">Poll App</h1>
      {role !== ROLES.ADMIN ? <Link to="/login">
        <Button>
          Login
        </Button>
      </Link> :
        <Button onClick={handleLogout}>
          LogOut
        </Button>
      }
    </nav>
  );
}
