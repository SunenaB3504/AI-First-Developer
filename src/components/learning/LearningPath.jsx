import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useProgress } from '../../context/ProgressContext';
import './LearningPath.css';

const LearningPath = ({ modules, onLessonClick, selectedLesson }) => {
  const [collapsedModules, setCollapsedModules] = useState([]);
  const { completedLessons, markLessonCompleted } = useProgress();
  const selectedLessonRef = useRef(null);

  const handleLessonClick = (lesson, lessonId) => {
    onLessonClick(lesson);
    // Automatically mark lesson as completed when clicked
    // In a real app, you might do this when a "Next" button is clicked or after a quiz
    markLessonCompleted(lessonId);
  };

  const toggleModule = (moduleId) => {
    setCollapsedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  useEffect(() => {
    if (selectedLesson) {
      const parentModule = modules.find(m => m.sections.some(l => l.title === selectedLesson.title));
      if (parentModule && collapsedModules.includes(parentModule.id)) {
        toggleModule(parentModule.id);
      }
    }
  }, [selectedLesson]);

  useEffect(() => {
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
        const allLessonsInSection = module.sections || [];
        const completedLessonsInSection = allLessonsInSection.filter(l => completedLessons.has(l.id)).length;
        const isModuleCompleted = allLessonsInSection.length > 0 && completedLessonsInSection === allLessonsInSection.length;

        return (
          <div key={module.id} className={`path-module ${isModuleCompleted ? 'completed' : ''}`}>
            <h2 className="module-title" onClick={() => toggleModule(module.id)}>
              <span>{module.name}</span>
              <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>▼</span>
            </h2>
            {!isCollapsed && (
              <ul className="path-lessons">
                {allLessonsInSection.map((lesson) => {
                  const isSelected = selectedLesson && selectedLesson.title === lesson.title;
                  const isCompleted = completedLessons.has(lesson.id);
                  const lessonClass = `path-lesson ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`;

                  return (
                    <li
                      key={lesson.title}
                      className={lessonClass}
                      onClick={() => handleLessonClick(lesson, lesson.id)}
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
