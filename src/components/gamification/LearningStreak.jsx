/**
 * @file LearningStreak.jsx
 * @description A component to display the user's current learning streak.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './LearningStreak.css';

const LearningStreak = ({ currentStreak }) => {
  return (
    <div className="learning-streak">
      {currentStreak > 1 ? (
        <p>🔥 {currentStreak} Day Streak</p>
      ) : (
        <p>Start your learning streak today!</p>
      )}
    </div>
  );
};

LearningStreak.propTypes = {
  currentStreak: PropTypes.number.isRequired,
};

export default LearningStreak;
