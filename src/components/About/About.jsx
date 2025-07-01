import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './About.css';

const About = () => {
  const { interests, personal } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className={`section-title ${isVisible ? 'fade-in-up' : ''}`}>
          <h2>About Me</h2>
          <p>Get to know me better - my background, education, and professional approach</p>
        </div>
        <div className={`about-content ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="about-text">
            <h3>Software Developer & Tech Innovator</h3>
            <p>{personal.bio}</p>
            <p>{personal.approach}</p>
            
            <div className="interests">
              <h4>Technical Interests</h4>
              <div className="interest-tags">
                {interests.map((interest, index) => (
                  <div 
                    key={index} 
                    className="interest-tag"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;