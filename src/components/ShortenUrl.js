import React, { useState } from 'react';
import api from '../utils/api';
import ActivePlans from './ActivePlan';
import { Link } from 'react-router-dom';
import '../css/ShortenUrl.css'; // Custom CSS for animations and additional styling

const ShortenUrl = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const forbiddenKeywords = ['sex', 'porn', 'adult', 'xxx', 'gambling']; // Add more sensitive keywords here

  const validateUrl = (url) => {
    const urlPattern = /^(http|https):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    return urlPattern.test(url);
  };

  const containsForbiddenKeywords = (url) => {
    return forbiddenKeywords.some((keyword) => url.toLowerCase().includes(keyword));
  };

  const shortenUrl = async () => {
    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    if (!validateUrl(url)) {
      setError('URL must start with http:// or https://');
      return;
    }

    if (containsForbiddenKeywords(url)) {
      setError('The URL contains sensitive content and cannot be shortened.');
      return;
    }

    setError(''); // Clear error if validation passes
    try {
      const response = await api.post('/shorten-url', { url });
      setShortenedUrl(response.data.shortenedUrl);
    } catch (error) {
      console.error('Error shortening URL', error);
      setError('An error occurred while shortening the URL. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center">
        <h2 className="mb-4 animate-fade-in">Shorten Your URL</h2>
        <p className="text-muted mb-5 animate-fade-in">
          Enter a long URL below to shorten it for easy sharing.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="input-group mb-3 animate-slide-up">
            <input
              type="text"
              className="form-control"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to shorten"
            />
            <button className="btn btn-primary" onClick={shortenUrl}>
              Shorten URL
            </button>
          </div>
          {error && <p className="text-danger animate-fade-in">{error}</p>}
        </div>
      </div>

      {shortenedUrl && (
        <div className="text-center mt-4 animate-zoom-in">
          <h4>Shortened URL:</h4>
          <p className="text-primary">
            <strong>{`${process.env.REACT_APP_APP_URL}/${shortenedUrl}`}</strong>
          </p>
        </div>
      )}

      <div className="mt-5">
        <ActivePlans
          planNameShow={false}
          urlLimitShow={true}
          dailyUrlLimitShow={false}
          urlsRemainingTodayShow={true}
          urlsRemainingMonthShow={true}
          activationDateShow={false}
          expirationDateShow={false}
          daysRemainingShow={false}
        />
      </div>

      <div className="text-center mt-4">
        <Link to="/plans" className="btn btn-outline-secondary animate-hover">
          View My Full Plan
        </Link>
      </div>
    </div>
  );
};

export default ShortenUrl;
