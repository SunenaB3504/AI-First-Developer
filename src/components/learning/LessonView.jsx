import React from 'react';
import PropTypes from 'prop-types';
import CodePlayground from './CodePlayground';
import './LessonView.css';

/**
 * LessonView component to display lesson content.
 * @param {object} props - The component props.
 * @param {object} props.lesson - The lesson to display.
 * @returns {JSX.Element} The rendered component.
 */
const LessonView = ({ lesson }) => {
  if (!lesson) {
    return <div className="lesson-view">Select a lesson to start.</div>;
  }

  return (
    <div className="lesson-view">
      <h2>{lesson.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
      {lesson.exercise && <CodePlayground exercise={lesson.exercise} />}
    </div>
  );
};

LessonView.propTypes = {
    lesson: PropTypes.object,
};

export default LessonView;
