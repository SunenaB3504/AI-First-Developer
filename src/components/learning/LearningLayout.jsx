import React, { useState } from 'react';
import LearningPath from './LearningPath';
import LessonView from './LessonView';
import { modules } from '../../data/lessons';
import './LearningLayout.css';

/**
 * LearningLayout component that arranges the sidebar and lesson view.
 * @returns {JSX.Element} The rendered component.
 */
const LearningLayout = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleLessonClick = (lesson, module) => {
    setSelectedLesson(lesson);
    setSelectedModule(module);
  };

  return (
    <div className="learning-layout">
      <LearningPath modules={modules} onLessonClick={handleLessonClick} selectedLesson={selectedLesson} />
      <LessonView lesson={selectedLesson} aiPrompts={selectedModule?.aiPrompts} />
    </div>
  );
};

export default LearningLayout;
