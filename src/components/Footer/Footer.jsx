import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import './Footer.css';

const Footer = () => {
  const { personal, navigation } = portfolioData;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <button 
              onClick={scrollToTop}
              className="logo-button"
              aria-label="Scroll to top"
            >
              {personal.name}
            </button>
          </div>
          <nav className="footer-links" role="navigation" aria-label="Footer navigation">
            {navigation.map((item, index) => (
              <a key={index} href={item.href}>
                {item.name}
              </a>
            ))}
          </nav>
          <p className="copyright">
            © {currentYear} {personal.name}. All Rights Reserved.
          </p>
          <p className="footer-tagline">
            Built with ❤️ using React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;