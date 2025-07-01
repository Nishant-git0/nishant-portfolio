import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SkillCard from './SkillCard';
import './Skills.css';

const Skills = () => {
  const { skills } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <div className={`section-title ${isVisible ? 'fade-in-up' : ''}`}>
          <h2>Technical Skills</h2>
          <p>My technical expertise spans across modern software development technologies</p>
        </div>
        <div className={`skills-container ${isVisible ? 'fade-in-up' : ''}`}>
          {skills.map((skill, index) => (
            <SkillCard 
              key={index} 
              skill={skill} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;