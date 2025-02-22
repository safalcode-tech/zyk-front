import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import ShortenUrl from './components/ShortenUrl';
import RedirectHandler from './components/RedirectHandler';
import Plans from './components/Plans';
import Navigation from './components/Navigation';
import Loader from './components/Loader'; // Import the Loader component
import './App.css';
import useAuth from './hooks/useAuth';
import MyUrls from './components/MyUrls';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './components/Contact';
import About from './components/About';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import Footer from './components/Footer';
import Home from './components/Home';
import PaymentStatus from './components/PaymentStatus';

const App = () => {
  const isLoggedIn = useAuth(); // Use the custom auth hook
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [loading, setLoading] = useState(false); // Loader state
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

  // Simulate loading effect (example for demonstration)
  useEffect(() => {
    setLoading(true); // Show loader
    const timer = setTimeout(() => setLoading(false), 1000); // Hide loader after 1 second
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  return (
    <>
      {loading && <Loader />} {/* Display loader when loading */}
      <Navigation isLoggedIn={isLoggedIn} />
      {/* Check offline or online */}
      {isOffline && (
        <div style={styles.offlineBanner}>
          You are currently offline. Please check your internet connection.
        </div>
      )}
      {/* Routes */}
      <div className="container-fluid p-0">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default route */}
          <Route
            path="/short"
            element={isLoggedIn ? <ShortenUrl /> : <Login />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* Wrap secure routes with ProtectedRoute */}
          <Route
            path="/my-urls"
            element={isLoggedIn ? <MyUrls /> : <Login />}
          />
          <Route path="/:shortenedUrl" element={<RedirectHandler />} />
          <Route path="/payment-success" element={<PaymentStatus />} />
        </Routes>
      </div>
      <Footer/>

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
