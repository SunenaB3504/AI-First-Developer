import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProjectForm.css';

const ProjectForm = ({ onSubmit, projectToEdit, onCancel }) => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
  });

  useEffect(() => {
    if (projectToEdit) {
      setProject(projectToEdit);
    } else {
      setProject({
        title: '',
        description: '',
        imageUrl: '',
        projectUrl: '',
        githubUrl: '',
      });
    }
  }, [projectToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project);
    setProject({ title: '', description: '', imageUrl: '', projectUrl: '', githubUrl: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h2>{projectToEdit ? 'Edit Project' : 'Add New Project'}</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={project.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea name="description" value={project.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input type="url" name="imageUrl" value={project.imageUrl} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="projectUrl">Project URL</label>
        <input type="url" name="projectUrl" value={project.projectUrl} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="githubUrl">GitHub URL</label>
        <input type="url" name="githubUrl" value={project.githubUrl} onChange={handleChange} />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">{projectToEdit ? 'Update Project' : 'Add Project'}</button>
        {onCancel && <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>}
      </div>
    </form>
  );
};

ProjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  projectToEdit: PropTypes.object,
  onCancel: PropTypes.func,
};

export default ProjectForm;
