import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getAIResponse } from '../../services/aiService';
import './AIPrompt.css';

const AIPrompt = ({ context }) => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="ai-prompt-container">
      <h4>AI Assistant</h4>
      <p>Need a hint or a deeper explanation? Ask our AI assistant.</p>
      <button onClick={handleGetTip} disabled={isLoading}>
        {isLoading ? 'Thinking...' : 'Get an AI Tip'}
      </button>
      {response && (
        <div className="ai-response">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

AIPrompt.propTypes = {
  context: PropTypes.string,
};

export default AIPrompt;
