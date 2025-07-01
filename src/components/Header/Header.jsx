import React, { useState, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigation, personal } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <a href="#home" className="logo" aria-label="Nishant Thakur - Home">
            <i className="fas fa-code" aria-hidden="true"></i> 
            {personal.name}
          </a>
          
          <ul 
            className={`nav-links ${isMenuOpen ? 'active' : ''}`}
            role="menubar"
            onKeyDown={handleKeyDown}
          >
            {navigation.map((item, index) => (
              <li key={index} role="none">
                <a 
                  href={item.href} 
                  onClick={closeMenu}
                  role="menuitem"
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          
          <button 
            className="hamburger" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-links"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;