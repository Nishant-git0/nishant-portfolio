import React from 'react';

const SkillCard = ({ skill, index, isVisible }) => {
  const { category, icon, technologies } = skill;

  return (
    <div 
      className={`skill-card ${isVisible ? 'animate' : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="skill-icon">
        <i className={icon} aria-hidden="true"></i>
      </div>
      <h3>{category}</h3>
      <div className="skills-list">
        {technologies.map((tech, techIndex) => (
          <div 
            key={techIndex} 
            className="skill-tag"
            style={{ animationDelay: `${(index * 0.2) + (techIndex * 0.1)}s` }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;