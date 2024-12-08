import React, { useState } from 'react';
import api from '../utils/api';
import useAuth from '../hooks/useAuth';  // Import the useAuth hook

const LoginRegister = ({isLoggedIn}) => {

  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.reload();
    } catch (error) {
      console.error('Login failed', error);
      setMessage('Login failed. Please try again.');
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      await api.post('/register', { username, email, password });
      setMessage('Registration successful! Please log in.');
      setIsLogin(true); // Switch to Login after successful registration
    } catch (error) {
      console.error('Registration failed', error);
      setMessage('Registration failed. Please try again.' + error.response.data.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>{isLogin ? 'Login' : 'Register'}</h2>
        {message && <p style={styles.message}>{message}</p>}

        {!isLogin && (
        <input
          type="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your username"
          style={styles.input}
        />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={styles.input}
        />
        {!isLogin && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            style={styles.input}
          />
        )}
        <button
          onClick={isLogin ? handleLogin : handleRegister}
          style={styles.button}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
            style={styles.toggleLink}
          >
            {isLogin ? ' Register here' : ' Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px 30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
  },
  heading: {
    fontSize: '24px',
    margin: '0 0 20px 0',
    color: '#333',
  },
  message: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  toggleText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
  },
  toggleLink: {
    color: '#007bff',
    cursor: 'pointer',
    marginLeft: '5px',
    textDecoration: 'underline',
  },
};

export default LoginRegister;
