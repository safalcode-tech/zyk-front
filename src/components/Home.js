import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <>
      {/* Hero Section with Bootstrap Slider */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-flex align-items-center justify-content-center vh-100 bg-primary text-white">
              <div className="text-center">
                <h1 className="display-4 fw-bold">Simplify Your Links</h1>
                <p className="lead">Transform long URLs into short, shareable links.</p>
                <Link to="/short" className="btn btn-light btn-lg">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex align-items-center justify-content-center vh-100 bg-secondary text-white">
              <div className="text-center">
                <h1 className="display-4 fw-bold">Track Your Performance</h1>
                <p className="lead">Monitor clicks and engagement metrics in real-time.</p>
                <Link to="/about" className="btn btn-light btn-lg">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex align-items-center justify-content-center vh-100 bg-dark text-white">
              <div className="text-center">
                <h1 className="display-4 fw-bold">Secure & Reliable</h1>
                <p className="lead">Your data is protected with the highest security standards.</p>
                <Link to="/privacy" className="btn btn-light btn-lg">
                  View Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Zyk.li?</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="card border-0">
                <div className="card-body">
                  <i className="fas fa-link fa-2x text-primary mb-3"></i>
                  <h5>Easy URL Shortening</h5>
                  <p>Shorten your links effortlessly and share them anywhere.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-0">
                <div className="card-body">
                  <i className="fas fa-chart-line fa-2x text-primary mb-3"></i>
                  <h5>Real-Time Analytics</h5>
                  <p>Track your link's performance with detailed analytics.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-0">
                <div className="card-body">
                  <i className="fas fa-shield-alt fa-2x text-primary mb-3"></i>
                  <h5>Secure & Reliable</h5>
                  <p>Enjoy a secure platform backed by advanced technology.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2>Ready to Get Started?</h2>
          <p className="lead">Sign up today and start managing your links efficiently!</p>
          <Link to="/short" className="btn btn-light btn-lg">
            Sign Up for Free
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse1"
                  aria-expanded="true"
                  aria-controls="collapse1"
                >
                  How does Zyk.li work?
                </button>
              </h2>
              <div id="collapse1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Zyk.li takes your long URLs and generates a short, shareable link that redirects to your original URL.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse2"
                  aria-expanded="false"
                  aria-controls="collapse2"
                >
                  Is Zyk.li free to use?
                </button>
              </h2>
              <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes, Zyk.li offers a free plan for basic URL shortening, with additional features available in premium plans.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse3"
                  aria-expanded="false"
                  aria-controls="collapse3"
                >
                  Can I track my shortened links?
                </button>
              </h2>
              <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes, our analytics dashboard provides detailed tracking for all your links, including clicks and engagement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
