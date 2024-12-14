import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Logout from './Logout'; // Assuming you have this component
import useAuth from '../hooks/useAuth';
const Navigation = () => {
  const isLoggedIn = useAuth(); // Use the custom auth hook
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            ZYK.LI
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Menu Items for Desktop */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/plans" className="nav-link text-white">
                  Plans
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-white">
                  Contact
                </Link>
              </li>
              {isLoggedIn && (
              <li  className="nav-item">
                <Link to="/my-urls" className="nav-link text-white">
                  My Urls
                </Link>
              </li>
            )}
              
              <li className="nav-item">
                <Logout />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile View */}
      <div
        className={`offcanvas offcanvas-start ${isSidebarOpen ? 'show' : ''}`}
        style={{
          width: '250px',
          backgroundColor: '#007bff',
          color: '#fff',
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={toggleSidebar}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/plans" className="nav-link text-white">
                Plans
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/my-urls" className="nav-link text-white">
                My Urls
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link text-white">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
