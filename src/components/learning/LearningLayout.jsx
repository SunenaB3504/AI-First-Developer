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

  return (
    <div className="learning-layout">
      <LearningPath modules={modules} onLessonClick={setSelectedLesson} selectedLesson={selectedLesson} />
      <LessonView lesson={selectedLesson} />
    </div>
  );
};

export default LearningLayout;
