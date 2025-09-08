import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './LearningPath.css';

const LearningPath = ({ modules, onLessonClick, selectedLesson }) => {
  const [collapsedModules, setCollapsedModules] = useState([]);
  const selectedLessonRef = useRef(null);

  const toggleModule = (moduleId) => {
    setCollapsedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  useEffect(() => {
    if (selectedLesson) {
      // Find which module the selected lesson belongs to
      const parentModule = modules.find(m => m.sections.some(l => l.title === selectedLesson.title));
      if (parentModule && collapsedModules.includes(parentModule.id)) {
        // If the parent module is collapsed, expand it
        toggleModule(parentModule.id);
      }
    }
  }, [selectedLesson]);

  useEffect(() => {
    // Scroll the selected lesson into view
    if (selectedLessonRef.current) {
      selectedLessonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedLesson]);


  return (
    <nav className="learning-path">
      {modules.map((module) => {
        const isCollapsed = collapsedModules.includes(module.id);
        return (
          <div key={module.id} className="path-module">
            <h2 className="module-title" onClick={() => toggleModule(module.id)}>
              <span>{module.name}</span>
              <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>▼</span>
            </h2>
            {!isCollapsed && (
              <ul className="path-lessons">
                {(module.sections || []).map((lesson) => {
                  const isSelected = selectedLesson && selectedLesson.title === lesson.title;
                  const lessonClass = `path-lesson ${isSelected ? 'selected' : ''}`;

                  return (
                    <li
                      key={lesson.title}
                      className={lessonClass}
                      onClick={() => onLessonClick(lesson)}
                      ref={isSelected ? selectedLessonRef : null}
                    >
                      <div className="lesson-node">
                        <div className="node-circle"></div>
                      </div>
                      <div className="lesson-title">{lesson.title}</div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
};

LearningPath.propTypes = {
  modules: PropTypes.array.isRequired,
  onLessonClick: PropTypes.func.isRequired,
  selectedLesson: PropTypes.object,
};

export default LearningPath;
