import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getAIResponse } from '../../services/aiService';
import './AIPrompt.css';

const AIPrompt = ({ prompts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handlePromptClick = async (prompt) => {
    setIsLoading(true);
    setResponse('');
    const aiResponse = await getAIResponse(prompt);
    setResponse(aiResponse);
    setIsLoading(false);
  };

  return (
    <div className="ai-prompt-container">
      <h3>Ask the AI</h3>
      <div className="prompt-buttons">
        {prompts.map((prompt, index) => (
          <button key={index} onClick={() => handlePromptClick(prompt)} disabled={isLoading}>
            {prompt}
          </button>
        ))}
      </div>
      {isLoading && <div className="loading-indicator">Thinking...</div>}
      {response && (
        <div className="ai-response">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

AIPrompt.propTypes = {
  prompts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AIPrompt;
