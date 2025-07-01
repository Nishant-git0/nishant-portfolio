import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import CodeBox from './CodeBox';
import ResumeDownload from '../Resume/ResumeDownload';
import profileImage from '../../assets/images/profile.jpg';
import './Hero.css';

const Hero = () => {
  const { personal } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="container">
        <div className={`hero-content ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="hero-text">
            <div className="hero-profile">
              <img 
                src={profileImage}
                alt={`${personal.name} - Profile`}
                className="hero-avatar"
              />
            </div>
            <h1>
              Hi, I'm <span>{personal.name}</span><br />
              {personal.role}
            </h1>
            <p>{personal.description}</p>
            <div className="btn-group">
              <a href="#projects" className="btn" aria-label="View my projects">
                View Projects
              </a>
              <ResumeDownload />
            </div>
          </div>
          <div className="hero-image">
            <CodeBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;