import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-4">Terms and Conditions</h1>
        <p className="lead text-muted">Understand the rules and guidelines for using Zyk.li.</p>
      </div>
      <div className="text-start">
        <h2>Acceptance of Terms</h2>
        <p>
          By using Zyk.li, operated by Safalcode Technologies, you agree to comply with these terms and conditions. 
          Please read them carefully before using our services.
        </p>

        <h2>Usage Guidelines</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">✅ <strong>Legitimate Use:</strong> All links must comply with applicable laws and regulations.</li>
          <li className="list-group-item">❌ <strong>No Malicious Content:</strong> Do not shorten links leading to harmful, illegal, or inappropriate content.</li>
          <li className="list-group-item">⚠️ <strong>Account Responsibility:</strong> Users are responsible for their accounts and activity.</li>
        </ul>

        <h2>Service Availability</h2>
        <p>
          Zyk.li strives to provide uninterrupted service but does not guarantee 100% uptime. We reserve the right 
          to modify or discontinue the service without prior notice.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Safalcode Technologies is not liable for any direct, indirect, or consequential damages resulting from the 
          use of Zyk.li. Users assume full responsibility for their actions on the platform.
        </p>

        <h2>Termination of Use</h2>
        <p>
          We reserve the right to suspend or terminate access to Zyk.li if users violate these terms and conditions 
          or engage in prohibited activities.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          Safalcode Technologies may update these terms at any time. Continued use of Zyk.li implies acceptance of 
          the updated terms.
        </p>

        <h2>Contact Information</h2>
        <p>
          For questions about these Terms and Conditions, contact us at <a href="mailto:support@zyk.li">support@zyk.li</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
