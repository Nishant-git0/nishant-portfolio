import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
  const { projects } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <div className={`section-title ${isVisible ? 'fade-in-up' : ''}`}>
          <h2>Featured Projects</h2>
          <p>Explore my recent work that showcases my software development expertise</p>
        </div>
        <div className={`projects-grid ${isVisible ? 'fade-in-up' : ''}`}>
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;