/**
 * @file ActivityLog.jsx
 * @description A component to show recent user activities and system events.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ActivityLog.css';

const ActivityLog = ({ activities }) => {
  return (
    <div className="activity-log">
      <h3>Recent Activities</h3>
      <div className="activity-list">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-type">{activity.activityType}</div>
              <div className="activity-meta">
                {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                  <span>{JSON.stringify(activity.metadata)}</span>
                )}
              </div>
              <div className="activity-timestamp">
                {activity.timestamp ? new Date(activity.timestamp.seconds * 1000).toLocaleString() : 'N/A'}
              </div>
            </div>
          ))
        ) : (
          <p>No recent activities.</p>
        )}
      </div>
    </div>
  );
};

ActivityLog.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      activityType: PropTypes.string.isRequired,
      metadata: PropTypes.object,
      timestamp: PropTypes.object,
    })
  ).isRequired,
};

export default ActivityLog;