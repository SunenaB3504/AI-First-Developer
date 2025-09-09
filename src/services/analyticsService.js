/**
 * @file analyticsService.js
 * @description Service for handling analytics data collection, processing, and retrieval.
 */
import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, orderBy, limit, serverTimestamp } from 'firebase/firestore';

/**
 * Logs a user activity event to Firestore.
 * @param {string} userId - The ID of the user performing the activity.
 * @param {string} activityType - The type of activity (e.g., 'lesson_completed', 'badge_earned').
 * @param {object} metadata - Additional data about the activity.
 * @returns {Promise<void>}
 */
export const logUserActivity = async (userId, activityType, metadata = {}) => {
  try {
    const activityData = {
      userId,
      activityType,
      metadata,
      timestamp: serverTimestamp(),
    };
    await addDoc(collection(db, 'userActivity'), activityData);
  } catch (error) {
    console.error('Error logging user activity:', error);
  }
};

/**
 * Retrieves analytics data for a specific user's progress.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} An object containing user progress analytics.
 */
export const getUserProgressAnalytics = async (userId) => {
  try {
    const q = query(
      collection(db, 'userActivity'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(100)
    );
    const querySnapshot = await getDocs(q);
    const activities = querySnapshot.docs.map(doc => doc.data());

    // Process activities to generate analytics
    const analytics = {
      totalActivities: activities.length,
      lessonCompletions: activities.filter(a => a.activityType === 'lesson_completed').length,
      badgeEarnings: activities.filter(a => a.activityType === 'badge_earned').length,
      recentActivities: activities.slice(0, 10),
    };

    return analytics;
  } catch (error) {
    console.error('Error fetching user progress analytics:', error);
    return { totalActivities: 0, lessonCompletions: 0, badgeEarnings: 0, recentActivities: [] };
  }
};

/**
 * Retrieves platform-wide analytics data.
 * @returns {Promise<object>} An object containing platform analytics.
 */
export const getPlatformAnalytics = async () => {
  try {
    const q = query(collection(db, 'userActivity'), orderBy('timestamp', 'desc'), limit(1000));
    const querySnapshot = await getDocs(q);
    const activities = querySnapshot.docs.map(doc => doc.data());

    // Aggregate platform data
    const analytics = {
      totalActivities: activities.length,
      uniqueUsers: new Set(activities.map(a => a.userId)).size,
      lessonCompletions: activities.filter(a => a.activityType === 'lesson_completed').length,
      badgeEarnings: activities.filter(a => a.activityType === 'badge_earned').length,
    };

    return analytics;
  } catch (error) {
    console.error('Error fetching platform analytics:', error);
    return { totalActivities: 0, uniqueUsers: 0, lessonCompletions: 0, badgeEarnings: 0 };
  }
};

/**
 * Retrieves performance metrics for the platform.
 * @returns {Promise<object>} An object containing performance metrics.
 */
export const getPerformanceMetrics = async () => {
  try {
    // This would typically integrate with Firebase Analytics or custom metrics
    // For now, return mock data
    const metrics = {
      averageSessionDuration: 25, // minutes
      pageLoadTime: 2.3, // seconds
      errorRate: 0.05, // 5%
      userRetention: 0.75, // 75%
    };

    return metrics;
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
    return { averageSessionDuration: 0, pageLoadTime: 0, errorRate: 0, userRetention: 0 };
  }
};