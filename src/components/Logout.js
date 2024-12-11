import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const isLoggedIn = useAuth(); // Check the user's login status

  return (
    <nav>
      {isLoggedIn ? (
        <li className="nav-item"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          <Link className="nav-link text-white">Logout</Link>

        </li>
      ) : (
        <li className="nav-item">
          <Link to="/login"  className="nav-link text-white" >
            Login
          </Link>
        </li>
      )}
    </nav>
  );
};
export default Navigation;
