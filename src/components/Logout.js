import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const isLoggedIn = useAuth(); // Check the user's login status

  return (
    <nav>
      {isLoggedIn ? (
        <li style={styles.navItem}
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          <Link style={styles.navLink}>Logout</Link>

        </li>
      ) : (
        <li style={styles.navItem}>
          <Link to="/login" style={styles.navLink}>
            Login
          </Link>
        </li>
      )}
    </nav>
  );
};
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    position: 'sticky',
    top: '0',
    zIndex: '1000',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  navItem: {
    textAlign: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  }
};
export default Navigation;
