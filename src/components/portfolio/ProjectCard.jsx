import React from 'react';
import PropTypes from 'prop-types';
import './ProjectCard.css';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="project-card">
      <img src={project.imageUrl || 'https://via.placeholder.com/300x200'} alt={project.title} className="project-image" />
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-links">
          {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">View Project</a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
        </div>
        <div className="project-actions">
          <button onClick={() => onEdit(project)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(project.id)} className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    projectUrl: PropTypes.string,
    githubUrl: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectCard;
