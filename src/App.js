import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import ShortenUrl from './components/ShortenUrl';
import RedirectHandler from './components/RedirectHandler';
import Plans from './components/Plans';
import Navigation from './components/Navigation';
import './App.css';
import useAuth from './hooks/useAuth';
import MyUrls from './components/MyUrls';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

const App = () => {
  const isLoggedIn = useAuth(); // Use the custom auth hook
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const navigate = useNavigate(); // Initialize the navigate hook

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
    <>
      <Navigation isLoggedIn={isLoggedIn} />
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
            element={isLoggedIn ? <ShortenUrl /> : <Login />}
          />
          <Route path="/plans" element={<Plans />} />
          {/* Wrap secure routes with ProtectedRoute */}
          <Route
            path="/my-urls"
            element={isLoggedIn ? <MyUrls /> : <Login />}
          />
          <Route path="/:shortenedUrl" element={<RedirectHandler />} />
        </Routes>
      </div>
    </>
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
