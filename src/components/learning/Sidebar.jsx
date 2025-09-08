import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

/**
 * Sidebar component for navigating modules and lessons.
 * @param {object} props - The component props.
 * @param {Array} props.modules - The list of modules to display.
 * @param {function} props.onLessonClick - The function to call when a lesson is clicked.
 * @returns {JSX.Element} The rendered component.
 */
const Sidebar = ({ modules, onLessonClick }) => {
  return (
    <div className="sidebar">
      {modules.map((module) => (
        <div key={module.id} className="module">
          <h3>{module.title}</h3>
          <ul>
            {(module.lessons || module.sections).map((lesson) => (
              <li key={lesson.id || lesson.title} onClick={() => onLessonClick(lesson)}>
                {lesson.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

Sidebar.propTypes = {
    modules: PropTypes.array.isRequired,
    onLessonClick: PropTypes.func.isRequired,
};

export default Sidebar;
