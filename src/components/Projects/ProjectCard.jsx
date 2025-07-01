import React from 'react';
import { apiEndpoints } from '../../services/api';

const ProjectCard = ({ project, index, isVisible }) => {
  const { id, title, description, technologies, gradient, demoUrl, sourceUrl } = project;

  const trackProjectClick = async (linkType, url) => {
    try {
      const sessionId = sessionStorage.getItem('sessionId') || `session_${Date.now()}`;
      
      await apiEndpoints.trackProjectClick({
        projectId: id,
        projectName: title,
        linkType,
        sessionId,
        metadata: {
          clickTime: new Date().toISOString(),
          url
        }
      });
    } catch (error) {
      console.error('Failed to track project click:', error);
    }
  };

  const handleLinkClick = (url, linkType, e) => {
    if (url === '#') {
      e.preventDefault();
      alert('Demo/Source link will be available soon!');
      return;
    }

    // Track the click
    trackProjectClick(linkType, url);
  };

  return (
    <div 
      className={`project-card ${isVisible ? 'animate' : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="project-img" style={{ background: gradient }}>
        <div className="project-overlay">
          <i className="fas fa-code" aria-hidden="true"></i>
        </div>
        <div className="project-title-overlay">
          {title.split(' ').slice(0, 2).join(' ')}
        </div>
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-tags">
          {technologies.map((tech, techIndex) => (
            <span 
              key={techIndex} 
              className="project-tag"
              style={{ animationDelay: `${(index * 0.2) + (techIndex * 0.1)}s` }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="project-links">
          <a 
            href={sourceUrl} 
            onClick={(e) => handleLinkClick(sourceUrl, 'source', e)}
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View source code for ${title}`}
          >
            <i className="fab fa-github" aria-hidden="true"></i> Source Code
          </a>
          <a 
            href={demoUrl} 
            onClick={(e) => handleLinkClick(demoUrl, 'demo', e)}
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View live demo of ${title}`}
          >
            <i className="fas fa-external-link-alt" aria-hidden="true"></i> Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;