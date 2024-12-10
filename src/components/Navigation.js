import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api'; // Assuming you have an API utility set up
import ShortenUrl from './ShortenUrl'; // Import ShortenUrl component
import Logout from './Logout';

const Navigation = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.navLink}>
        <div style={styles.logo}>ZYK.LI</div>
      </Link>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/plans" style={styles.navLink}>
            Plans
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>
            About
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/services" style={styles.navLink}>
            Services
          </Link>
        </li>

        <li style={styles.navItem}>
          <Link to="/contact" style={styles.navLink}>
            Contact
          </Link>
        </li>
        <li style={styles.navItem}>
          <Logout />
        </li>
      </ul>
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
