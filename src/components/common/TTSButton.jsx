import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cancel } from '../../utils/tts';
import './TTSButton.css';

const TTSButton = ({ title, content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  // Cleanup speech on component unmount
  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  // Effect to manage the utterance lifecycle
  useEffect(() => {
    if (!utterance) return;

    const handleEnd = () => {
      setIsPlaying(false);
    };

    utterance.addEventListener('end', handleEnd);

    // Speak the utterance
    window.speechSynthesis.speak(utterance);

    return () => {
      utterance.removeEventListener('end', handleEnd);
    };
  }, [utterance]);

  const handlePlayPause = () => {
    if (isPlaying) {
      cancel();
      setIsPlaying(false);
      setUtterance(null);
    } else {
      // 1. Combine title and content
      const fullText = `${title}. ${content}`;
      
      // 2. Strip HTML tags to get clean, readable text
      const plainText = fullText.replace(/<[^>]+>/g, '');

      // 3. Create and set the utterance to trigger the effect
      const newUtterance = new SpeechSynthesisUtterance(plainText);
      setUtterance(newUtterance);
      setIsPlaying(true);
    }
  };

  return (
    <button onClick={handlePlayPause} className="tts-button">
      {isPlaying ? '⏹️ Stop Audio' : '▶️ Play Audio'}
    </button>
  );
};

TTSButton.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default TTSButton;
