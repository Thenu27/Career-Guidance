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
                            <li><a href="/careers">Career Paths</a></li>
                        </ul>
                    </div>
                    <div className="footer-section support">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/help">Help Center</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-section connect">
                        <h4>Connect With Us</h4>
                        <div className="social-links">
                            <a href="#linkedin" className="social-icon">LinkedIn</a>
                            <a href="#twitter" className="social-icon">Twitter</a>
                            <a href="#facebook" className="social-icon">Facebook</a>
                            <a href="#instagram" className="social-icon">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="copyright">© 2025 Career Journey. All Rights Reserved.</p>
                    <div className="footer-logo">UG</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;