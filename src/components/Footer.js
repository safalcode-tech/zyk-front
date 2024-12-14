import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-4 pb-3">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5>About Zyk.li</h5>
            <p>
              Zyk.li is a fast and secure URL shortener service provided by Safalcode Technologies. 
              We help you simplify, manage, and track your links with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white text-decoration-none">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: <a href="mailto:info@safalcode.com" className="text-white text-decoration-none">info@safalcode.com</a></li>
              <li>Phone: +91 9226889662</li>
              <li>Location: Safalcode Technologies, India</li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="row mt-3">
          <div className="col text-center">
            <a
              href="https://www.facebook.com/safalcode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3 text-decoration-none"
            >
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a
              href="https://x.com/safalcode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3 text-decoration-none"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a
              href="https://www.linkedin.com/company/safalcode/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-3">
          <div className="col text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Zyk.li. All Rights Reserved. Built by Safalcode Technologies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
