import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import './LessonView.css';
import AIPrompt from '../ai/AIPrompt';
import TTSButton from '../common/TTSButton';

/**
 * LessonView component to display lesson content.
 * @param {object} props - The component props.
 * @param {object} props.lesson - The lesson to display.
 * @returns {JSX.Element} The rendered component.
 */
const LessonView = ({ lesson, aiPrompts }) => {
  if (!lesson) {
    return <div className="lesson-view">Select a lesson to start.</div>;
  }

  const sanitize = (html) => {
    // We allow pre and code tags for code blocks, but sanitize the rest.
    const sanitized = DOMPurify.sanitize(html, { ADD_TAGS: ['pre', 'code'] });
    return { __html: sanitized };
  };

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <h2 dangerouslySetInnerHTML={sanitize(lesson.title)} />
        <TTSButton title={lesson.title} content={lesson.content} />
      </div>
      
      <div className="lesson-content" dangerouslySetInnerHTML={sanitize(lesson.content.replace(/\n/g, '<br />'))} />

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
              <h4 dangerouslySetInnerHTML={sanitize(example.title)} />
              <pre className="code-block">
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {aiPrompts && aiPrompts.length > 0 && (
        <AIPrompt prompts={aiPrompts} />
      )}
    </div>
  );
};

LessonView.propTypes = {
    lesson: PropTypes.object,
    aiPrompts: PropTypes.array,
};

export default LessonView;
