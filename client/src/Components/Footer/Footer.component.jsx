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
                            <li><a href="/home">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/assessment">Assessment</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/profile">Profile</a></li>

                        </ul>
                    </div>
                    <div className="footer-section support">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-section connect">
                        <h4>Connect With Us</h4>
                        <div className="social-links">
                            <a href="#facebook" className="social-icon">Facebook</a>
                            <a href="#instagram" className="social-icon">Instagram</a>
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