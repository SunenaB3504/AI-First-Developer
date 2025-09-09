/**
 * @file BadgeCard.jsx
 * @description A component to display a single achievement badge.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './BadgeCard.css';

const BadgeCard = ({ badge }) => {
  return (
    <div className="badge-card">
      <div className="badge-icon">{badge.icon}</div>
      <div className="badge-details">
        <h4 className="badge-name">{badge.name}</h4>
        <p className="badge-description">{badge.description}</p>
      </div>
    </div>
  );
};

BadgeCard.propTypes = {
  badge: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default BadgeCard;
