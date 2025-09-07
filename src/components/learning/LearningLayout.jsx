import React, { useState } from 'react';
import Sidebar from './Sidebar';
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
      <Sidebar modules={modules} onLessonClick={setSelectedLesson} />
      <LessonView lesson={selectedLesson} />
    </div>
  );
};

export default LearningLayout;
