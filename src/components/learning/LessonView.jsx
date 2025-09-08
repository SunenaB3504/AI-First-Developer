import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
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

  // A simple function to replace \n with <br> for rendering
  const formatContent = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content.replace(/\n/g, '<br />'));
    return { __html: sanitizedContent };
  };

  return (
    <div className="lesson-view">
      <h2>{lesson.title}</h2>
      
      <div className="lesson-content" dangerouslySetInnerHTML={formatContent(lesson.content)} />

      {lesson.keyTopics && lesson.keyTopics.length > 0 && (
        <div className="key-topics">
          <h3>Key Topics</h3>
          <ul>
            {lesson.keyTopics.map(topic => <li key={topic}>{topic}</li>)}
          </ul>
        </div>
      )}

      {lesson.codeExamples && lesson.codeExamples.length > 0 && (
        <div className="code-examples">
          <h3>Code Examples</h3>
          {lesson.codeExamples.map((example, index) => (
            <div key={index} className="code-example">
              <h4>{example.title}</h4>
              <pre className="code-block">
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

LessonView.propTypes = {
    lesson: PropTypes.object,
};

export default LessonView;
