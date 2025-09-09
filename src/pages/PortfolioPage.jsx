import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addProject, getProjects, updateProject, deleteProject } from '../services/portfolioService';
import ProjectCard from '../components/portfolio/ProjectCard';
import ProjectForm from '../components/portfolio/ProjectForm';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    if (!currentUser) return;
    try {
      setIsLoading(true);
      const userProjects = await getProjects(currentUser.uid);
      setProjects(userProjects);
      setError(null);
    } catch (err) {
      setError("Failed to fetch projects. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentUser]);

  const handleFormSubmit = async (projectData) => {
    try {
      if (editingProject) {
        await updateProject(currentUser.uid, editingProject.id, projectData);
      } else {
        await addProject(currentUser.uid, projectData);
      }
      setEditingProject(null);
      fetchProjects(); // Refresh projects list
    } catch (err) {
      setError("Failed to save project. Please try again.");
      console.error(err);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(currentUser.uid, projectId);
        fetchProjects(); // Refresh projects list
      } catch (err) {
        setError("Failed to delete project. Please try again.");
        console.error(err);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  if (!currentUser) {
    return <div className="portfolio-page"><h2>Please log in to manage your portfolio.</h2></div>;
  }

  return (
    <div className="portfolio-page">
      <h1>My Portfolio</h1>
      <ProjectForm onSubmit={handleFormSubmit} projectToEdit={editingProject} onCancel={handleCancelEdit} />
      
      {error && <p className="error-message">{error}</p>}
      
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map(project => (
              <ProjectCard key={project.id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
            ))
          ) : (
            <p>You haven't added any projects yet. Use the form above to get started!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
