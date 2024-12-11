import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import ShortenUrl from './components/ShortenUrl';
import RedirectHandler from './components/RedirectHandler';
import Plans from './components/Plans';
import Navigation from './components/Navigation';
import './App.css';
import api from './utils/api';
import useAuth from './hooks/useAuth';
import MyUrls from './components/MyUrls';

const AppContent = ({ isLoggedIn, isOffline, styles }) => {
  const location = useLocation(); // Now inside the Router context

  return (
    <>
      {/* Conditionally render Navigation based on the current path */}
      {!location.pathname.match(/^\/[^/]+$/) && (
        <Navigation isLoggedIn={isLoggedIn} />
      )}
      {/* Check offline or online */}
      {isOffline && (
        <div style={styles.offlineBanner}>
          You are currently offline. Please check your internet connection.
        </div>
      )}
      {/* Routes */}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <ShortenUrl />
                </>
              ) : (
                <Login />
              )
            }
          />
          <Route path="/plans" element={<Plans />} />
          <Route path="/my-urls" element={<MyUrls />} />
          <Route path="/:shortenedUrl" element={<RedirectHandler />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  const isLoggedIn = useAuth(); // Use the custom auth hook
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Check Internet connectivity
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} isOffline={isOffline} styles={styles} />
    </Router>
  );
};

const styles = {
  offlineBanner: {
    backgroundColor: '#ffcc00',
    color: '#333',
    textAlign: 'center',
    padding: '10px',
    fontWeight: 'bold',
  },
};

export default App;