import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { getAIResponse, getAIAnswerForQuestion } from '../../services/aiService';
import './AIPrompt.css';

/**
 * @file AIPrompt.jsx
 * @description A component that provides AI-powered assistance, including context-aware tips and a Q&A interface.
 */
const AIPrompt = ({ context }) => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');

  /**
   * Fetches a pre-written, context-aware tip from the AI service.
   */
  const handleGetTip = async () => {
    setIsLoading(true);
    setResponse('');
    try {
      const res = await getAIResponse(context);
      setResponse(res.text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse('Sorry, I could not fetch a tip at the moment.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Submits a user's question to the AI service and displays the sanitized response.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setResponse('');
    try {
      const res = await getAIAnswerForQuestion(question);
      // Sanitize the AI response before rendering to prevent XSS attacks
      const sanitizedResponse = DOMPurify.sanitize(res.text);
      setResponse(sanitizedResponse);
    } catch (error) {
      console.error("Error fetching AI answer:", error);
      setResponse('Sorry, I could not get an answer at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-prompt-container">
      <h4>AI Assistant</h4>
      <p>Need a hint or a deeper explanation? Get a quick tip or ask a question.</p>
      
      <div className="ai-actions">
        <button onClick={handleGetTip} disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Get an AI Tip'}
        </button>
      </div>

      <form onSubmit={handleQuestionSubmit} className="ai-question-form">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about web development..."
          rows="3"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !question.trim()}>
          Submit Question
        </button>
      </form>

      {response && (
        <div className="ai-response">
          <div dangerouslySetInnerHTML={{ __html: response }} />
        </div>
      )}
    </div>
  );
};

AIPrompt.propTypes = {
  context: PropTypes.string,
};

export default AIPrompt;
