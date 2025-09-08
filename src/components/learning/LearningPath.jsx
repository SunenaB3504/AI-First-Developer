import React from 'react';
import PropTypes from 'prop-types';
import './LearningPath.css';

const LearningPath = ({ modules, onLessonClick, selectedLesson }) => {
  return (
    <nav className="learning-path">
      {modules.map((module, moduleIndex) => (
        <div key={module.id} className="path-module">
          <h2 className="module-title">{module.name}</h2>
          <ul className="path-lessons">
            {(module.sections || []).map((lesson, lessonIndex) => {
              const isCompleted = false; // Placeholder for completion logic
              const isSelected = selectedLesson && selectedLesson.title === lesson.title;
              const lessonClass = `path-lesson ${isCompleted ? 'completed' : ''} ${isSelected ? 'selected' : ''}`;

              return (
                <li key={lesson.title} className={lessonClass} onClick={() => onLessonClick(lesson)}>
                  <div className="lesson-node">
                    <div className="node-circle"></div>
                  </div>
                  <div className="lesson-title">{lesson.title}</div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
};

LearningPath.propTypes = {
  modules: PropTypes.array.isRequired,
  onLessonClick: PropTypes.func.isRequired,
  selectedLesson: PropTypes.object,
};

export default LearningPath;
