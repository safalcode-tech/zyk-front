import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-4">Privacy Policy</h1>
        <p className="lead text-muted">Your privacy matters to us at Zyk.li.</p>
      </div>
      <div className="text-start">
        <h2>Introduction</h2>
        <p>
          At Zyk.li, operated by Safalcode Technologies, your privacy is our top priority. This Privacy Policy outlines 
          how we collect, use, and protect your personal information.
        </p>

        <h2>Information We Collect</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">🌐 <strong>Usage Data:</strong> Information about your interactions with our platform.</li>
          <li className="list-group-item">📧 <strong>Contact Information:</strong> Email addresses or other data you voluntarily provide.</li>
          <li className="list-group-item">🛠️ <strong>Technical Data:</strong> IP addresses, browser types, and device information.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>
          We use your information to:
        </p>
        <ul>
          <li>Provide and improve our services.</li>
          <li>Analyze usage trends and enhance user experience.</li>
          <li>Ensure platform security and reliability.</li>
          <li>Communicate updates, features, and offers.</li>
        </ul>

        <h2>Data Protection</h2>
        <p>
          Safeguarding your data is our responsibility. We use industry-standard security measures to ensure your 
          information is safe and secure.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information at any time. Contact us at 
           <a href="mailto:info@safalcode.com">info@safalcode.com</a> for assistance.
        </p>

        <h2>Updates to This Policy</h2>
        <p>
          This Privacy Policy may be updated periodically. We encourage you to review it frequently to stay informed.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
