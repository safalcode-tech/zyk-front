// import React, { useState } from 'react';
// import api from '../utils/api';
// import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA component
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const LoginRegister = () => {
//   const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
//   const [username, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [recaptchaToken, setRecaptchaToken] = useState(''); // To store reCAPTCHA token

//   const recaptchaRef = React.createRef();

//   const validateForm = () => {
//     if (!email || !password || (!isLogin && !username)) {
//       setMessage('Please fill in all fields');
//       return false;
//     }

//     // Email validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(email)) {
//       setMessage('Please enter a valid email');
//       return false;
//     }

//     // Password validation
//     if (password.length < 6) {
//       setMessage('Password must be at least 6 characters');
//       return false;
//     }

//     // Confirm password check for registration
//     if (!isLogin && password !== confirmPassword) {
//       setMessage('Passwords do not match');
//       return false;
//     }

//     return true;
//   };

//   const handleLogin = async () => {
//     if (!recaptchaToken) {
//       setMessage('Please verify reCAPTCHA');
//       return;
//     }

//     if (!validateForm()) return; // Validate before submitting

//     try {
//       const response = await api.post('/login', { email, password, recaptchaToken });
//       localStorage.setItem('token', response.data.token);
//       window.location.reload();
//     } catch (error) {
//       console.error('Login failed', error);
//       setMessage('Login failed. Please try again.');
//     }
//   };

//   const handleRegister = async () => {
//     if (!recaptchaToken) {
//       setMessage('Please verify reCAPTCHA');
//       return;
//     }

//     if (!validateForm()) return; // Validate before submitting

//     try {
//       await api.post('/register', { username, email, password, recaptchaToken });
//       setMessage('Registration successful! Please log in.');
//       setIsLogin(true); // Switch to Login after successful registration
//     } catch (error) {
//       console.error('Registration failed', error);
//       setMessage('Registration failed. Please try again.' + (error.response?.data?.message || ''));
//     }
//   };

//   const onRecaptchaChange = (token) => {
//     setRecaptchaToken(token);
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4" style={{ width: '400px' }}>
//         <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
//         {message && <div className="alert alert-danger" role="alert">{message}</div>}

//         {!isLogin && (
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               value={username}
//               onChange={(e) => setUserName(e.target.value)}
//               placeholder="Enter your username"
//             />
//           </div>
//         )}

//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//         </div>

//         {!isLogin && (
//           <div className="mb-3">
//             <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm your password"
//             />
//           </div>
//         )}

//         {/* Google reCAPTCHA v2 */}
//         <div className="mb-3">
//           <ReCAPTCHA
//             sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
//             onChange={onRecaptchaChange}
//             ref={recaptchaRef}
//           />
//         </div>

//         <button
//           className="btn btn-primary w-100"
//           onClick={isLogin ? handleLogin : handleRegister}
//         >
//           {isLogin ? 'Login' : 'Register'}
//         </button>

//         <p className="text-center mt-3">
//           {isLogin ? "Don't have an account?" : 'Already have an account?'}
//           <span
//             className="text-primary" 
//             style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setMessage('');
//             }}
//           >
//             {isLogin ? ' Register here' : ' Login here'}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;

import React, { useState } from 'react';
import api from '../utils/api';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState(''); // Added mobile state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(''); // To store reCAPTCHA token

  const recaptchaRef = React.createRef();

  const validateForm = () => {
    if (!email || !password || (!isLogin && (!username || !mobile))) {
      setMessage('Please fill in all fields');
      return false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email');
      return false;
    }

    // Mobile validation (basic check for 10-digit number)
    const mobileRegex = /^[0-9]{10}$/;
    if (!isLogin && !mobileRegex.test(mobile)) {
      setMessage('Please enter a valid 10-digit mobile number');
      return false;
    }

    // Password validation
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return false;
    }

    // Confirm password check for registration
    if (!isLogin && password !== confirmPassword) {
      setMessage('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!recaptchaToken) {
      setMessage('Please verify reCAPTCHA');
      return;
    }

    if (!validateForm()) return; // Validate before submitting

    try {
      const response = await api.post('/login', { email, password, recaptchaToken });
      localStorage.setItem('token', response.data.token);
      window.location.reload();
    } catch (error) {
      console.error('Login failed', error);
      setMessage('Login failed. Please try again.');
    }
  };

  const handleRegister = async () => {
    if (!recaptchaToken) {
      setMessage('Please verify reCAPTCHA');
      return;
    }

    if (!validateForm()) return; // Validate before submitting

    try {
      await api.post('/register', { username, email, mobile, password, recaptchaToken });
      setMessage('Registration successful! Please log in.');
      setIsLogin(true); // Switch to Login after successful registration
    } catch (error) {
      console.error('Registration failed', error);
      setMessage('Registration failed. Please try again.' + (error.response?.data?.message || ''));
    }
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        {message && <div className="alert alert-danger" role="alert">{message}</div>}

        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
        )}

        {/* Google reCAPTCHA v2 */}
        <div className="mb-3">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
            onChange={onRecaptchaChange}
            ref={recaptchaRef}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={isLogin ? handleLogin : handleRegister}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p className="text-center mt-3">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span
            className="text-primary"
            style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
          >
            {isLogin ? ' Register here' : ' Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
