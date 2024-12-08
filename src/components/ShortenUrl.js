import React, { useState } from 'react';
import api from '../utils/api';
import ActivePlans from './ActivePlan';
import { Link } from 'react-router-dom';

const ShortenUrl = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const shortenUrl = async () => {
    try {
      const response = await api.post('/shorten-url', { url });
      setShortenedUrl(response.data.shortenedUrl);
    } catch (error) {
      console.error('Error shortening URL', error);
    }
  };

  return (
    <div>
      <h2>Shorten URL</h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to shorten"
      />
      <button onClick={shortenUrl}>Shorten URL</button>
      {shortenedUrl && (
        <div>
          <h3>Shortened URL:</h3>
          <p>{`http://localhost:3000/${shortenedUrl}`}</p>
        </div>
      )}

      {/* Display active plan */}
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
      <button><Link to="/plans" >View my full plan.</Link></button>
    </div>
  );
};

export default ShortenUrl;
