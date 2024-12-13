import React, { useState, useRef } from 'react';
import api from '../utils/api';
import ReCAPTCHA from 'react-google-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const recaptchaRef = useRef(null);

  const validateForm = () => {
    if (!name || !email || !message) {
      setFormMessage('All fields are required.');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setFormMessage('Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage('');

    if (!validateForm()) return;

    const recaptchaToken = recaptchaRef.current.getValue();

    if (!recaptchaToken) {
      setFormMessage('Please complete the reCAPTCHA verification.');
      return;
    }

    try {
      const response = await api.post('/contact/insert', {
        name,
        email,
        message,
        recaptchaToken,
      });

      if (response.data.success) {
        setFormMessage('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
        recaptchaRef.current.reset(); // Reset reCAPTCHA after successful submission
      } else {
        setFormMessage('Failed to send your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormMessage('An error occurred while sending your message.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Contact Us</h2>

        {formMessage && (
          <div
            className={`alert ${
              formMessage.includes('successfully') ? 'alert-success' : 'alert-danger'
            }`}
            role="alert"
          >
            {formMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              required
            />
          </div>

          <div className="mb-3">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
              ref={recaptchaRef}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
