/**
 * @file AnalyticsDashboardPage.jsx
 * @description A page for displaying analytics data, including user progress, platform metrics, and activity logs.
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProgressAnalytics, getPlatformAnalytics, getPerformanceMetrics } from '../services/analyticsService';
import MetricsCard from '../components/analytics/MetricsCard';
import AnalyticsChart from '../components/analytics/AnalyticsChart';
import ActivityLog from '../components/analytics/ActivityLog';
import './AnalyticsDashboardPage.css';

const AnalyticsDashboardPage = () => {
  const { currentUser } = useAuth();
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [platformAnalytics, setPlatformAnalytics] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const [userData, platformData, perfData] = await Promise.all([
          getUserProgressAnalytics(currentUser.uid),
          getPlatformAnalytics(),
          getPerformanceMetrics(),
        ]);

        setUserAnalytics(userData);
        setPlatformAnalytics(platformData);
        setPerformanceMetrics(perfData);
        setError(null);
      } catch (err) {
        setError('Failed to load analytics data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [currentUser]);

  if (isLoading) {
    return <div className="analytics-dashboard"><h2>Loading Analytics...</h2></div>;
  }

  if (error) {
    return <div className="analytics-dashboard"><p className="error-message">{error}</p></div>;
  }

  if (!currentUser) {
    return <div className="analytics-dashboard"><h2>Please log in to view analytics.</h2></div>;
  }

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>

      <div className="metrics-grid">
        <MetricsCard
          title="Your Activities"
          value={userAnalytics?.totalActivities || 0}
          icon="📊"
          trend="+12% this week"
        />
        <MetricsCard
          title="Lessons Completed"
          value={userAnalytics?.lessonCompletions || 0}
          icon="✅"
          trend="+5% this week"
        />
        <MetricsCard
          title="Badges Earned"
          value={userAnalytics?.badgeEarnings || 0}
          icon="🏆"
          trend="+2 this week"
        />
        <MetricsCard
          title="Platform Users"
          value={platformAnalytics?.uniqueUsers || 0}
          icon="👥"
        />
      </div>

      <div className="charts-section">
        <AnalyticsChart data={userAnalytics} type="User Progress" />
        <AnalyticsChart data={platformAnalytics} type="Platform Overview" />
      </div>

      <div className="activity-section">
        <ActivityLog activities={userAnalytics?.recentActivities || []} />
      </div>

      <div className="performance-section">
        <h2>Performance Metrics</h2>
        <div className="metrics-grid">
          <MetricsCard
            title="Avg Session Duration"
            value={`${performanceMetrics?.averageSessionDuration || 0} min`}
            icon="⏱️"
          />
          <MetricsCard
            title="Page Load Time"
            value={`${performanceMetrics?.pageLoadTime || 0} s`}
            icon="⚡"
          />
          <MetricsCard
            title="Error Rate"
            value={`${((performanceMetrics?.errorRate || 0) * 100).toFixed(1)}%`}
            icon="⚠️"
          />
          <MetricsCard
            title="User Retention"
            value={`${((performanceMetrics?.userRetention || 0) * 100).toFixed(1)}%`}
            icon="🔄"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboardPage;