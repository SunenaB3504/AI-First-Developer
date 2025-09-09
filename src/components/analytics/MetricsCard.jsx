/**
 * @file MetricsCard.jsx
 * @description A component to display key metrics like total users, active users, completion rates.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './MetricsCard.css';

const MetricsCard = ({ title, value, icon, trend }) => {
  return (
    <div className="metrics-card">
      <div className="metrics-header">
        <h3 className="metrics-title">{title}</h3>
        <div className="metrics-icon">{icon}</div>
      </div>
      <div className="metrics-value">{value}</div>
      {trend && <div className="metrics-trend">{trend}</div>}
    </div>
  );
};

MetricsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  trend: PropTypes.string,
};

export default MetricsCard;