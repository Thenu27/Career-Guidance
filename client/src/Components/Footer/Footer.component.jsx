import React from 'react';
import './Footer.styles.css';

const Footer = () => {
    return (
        <footer className="career-footer">
            <div className="footer-wrapper">
                <div className="footer-content">
                    <div className="footer-section quick-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">About Us</a></li>
                            <li><a href="/">Contact</a></li>
                            <li><a href="/">Profile</a></li>

                        </ul>
                    </div>
                    <div className="footer-section support">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="/">Contact Us</a></li>
                            <li><a href="/">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-section connect">
                        <h4>Connect With Us</h4>
                        <div className="social-links">
                            <a href="/" className="social-icon">Facebook</a>
                            <a href="/" className="social-icon">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="copyright">© 2025 UniverLens. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;