// Footer.jsx
import React from 'react';
import './Footer.css';
import logo from "../assets/images/Logo.png";
import contactlogo from '../assets/images/phone-solid.svg';
import iglogo from "../assets/images/instagram.svg";
import loclogo from "../assets/images/location-dot-solid.svg";

const Footer = () => {
    return (
        <footer className="footer-container">
            <img className="footer-logo" src={logo} alt="logo" />
            <div className="footer-title">DataWiz.</div>
            <div className="footer-description">
                Your Gateway to Mastering SQL Queries with Query Visualization, and Effortless Query <br /> Grading. Unleash the Power of Data with Ease.
            </div>
            <div className="footer-contact">
                <div className="contact-info">
                    <img className="contact-icon" src={contactlogo} alt="contactlogo" />
                    Contact Info: 
                </div>
                <div className="location-info">
                    <a href="https://maps.app.goo.gl/SR4fVYhzHYSssZ5eA" target="_blank" rel="noreferrer" className="location-link">
                    <img className="location-icon" src={loclogo} alt="loclogo" />
                    Dubai, United Arab Emirates
                    </a>
                </div>
                <div className="instagram-info">
                    <a href="https://www.instagram.com/datawiz.dw" target="_blank" rel="noreferrer" className="instagram-link">
                    <img className="instagram-icon" src={iglogo} alt="iglogo" />
                    Follow us on Instagram!
                    </a>
                </div>
            </div>
            <div className="footer-copyright">© 2023 DataWiz. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
