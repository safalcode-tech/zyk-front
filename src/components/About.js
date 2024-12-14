import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-4">About Us</h1>
        <p className="lead text-muted">
          Simplify your links, enhance your sharing experience.
        </p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2>Why Choose Us?</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">🚀 <strong>Efficiency:</strong> Turn long links into short ones instantly.</li>
            <li className="list-group-item">📊 <strong>Analytics:</strong> Track clicks, locations, and devices.</li>
            <li className="list-group-item">🔗 <strong>Customization:</strong> Create branded short links.</li>
            <li className="list-group-item">🔒 <strong>Security:</strong> Reliable and encrypted links.</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Our Mission</h2>
          <p>
            We strive to make online sharing simple, secure, and insightful. Whether for personal use or professional
            growth, our tools are here to empower your journey.
          </p>
          <h3>Who We Serve</h3>
          <p>
            From influencers to small businesses, our platform is designed for anyone who values efficient link sharing.
          </p>
        </div>
      </div>
      <div className="text-center mt-5">
        <h3>Get in Touch</h3>
        <p>
          Have questions? Contact us at <a href="mailto:info@safalcode.com">info@safalcode.com</a>.  
          Follow us on social media for the latest updates!
        </p>
      </div>
    </div>
  );
};

export default About;
