import React, { useState } from 'react';
import LearningPath from './LearningPath';
import LessonView from './LessonView';
import { modules } from '../../data/lessons';
import './LearningLayout.css';
import { useProgress } from '../../context/ProgressContext';

/**
 * LearningLayout component that arranges the sidebar and lesson view.
 * @returns {JSX.Element} The rendered component.
 */
const LearningLayout = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const { markLessonCompleted } = useProgress();

  const handleLessonClick = (lesson, module) => {
    setSelectedLesson(lesson);
    setSelectedModule(module);
    markLessonCompleted(lesson.id);
  };

  return (
    <div className="learning-layout">
      <LearningPath modules={modules} onLessonClick={handleLessonClick} selectedLesson={selectedLesson} />
      <LessonView lesson={selectedLesson} aiPrompts={selectedModule?.aiPrompts} />
    </div>
  );
};

export default LearningLayout;
