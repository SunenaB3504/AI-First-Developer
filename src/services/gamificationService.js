/**
 * @file gamificationService.js
 * @description Service for handling gamification features like learning streaks and badges.
 */
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, serverTimestamp, query, where } from 'firebase/firestore';
import { logUserActivity } from './analyticsService';

/**
 * Updates a user's learning streak based on their activity.
 * A streak is incremented if the last activity was yesterday.
 * It is reset to 1 if the last activity was before yesterday.
 * It remains the same if the activity is on the same day.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<void>}
 */
export const updateLearningStreak = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    console.error("User document not found!");
    return;
  }

  const userData = userDoc.data();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let lastActivityDate = null;
  if (userData.lastActivityDate) {
    lastActivityDate = userData.lastActivityDate.toDate();
    lastActivityDate.setHours(0, 0, 0, 0);
  }

  let currentStreak = userData.currentStreak || 0;

  if (lastActivityDate) {
    const diffTime = today.getTime() - lastActivityDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays === 1) {
      currentStreak += 1;
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
    // If diffDays is 0, do nothing.
  } else {
    currentStreak = 1;
  }

  await updateDoc(userRef, {
    currentStreak,
    lastActivityDate: serverTimestamp(),
  });

  // Log streak update if it increased
  if (currentStreak > (userData.currentStreak || 0)) {
    await logUserActivity(userId, 'streak_updated', { newStreak: currentStreak });
  }
};

/**
 * Awards a badge to a user if they haven't earned it already.
 * @param {string} userId - The ID of the user.
 * @param {object} badge - The badge object to award.
 * @returns {Promise<void>}
 */
export const awardBadge = async (userId, badge) => {
  const badgesRef = collection(db, `users/${userId}/badges`);
  const q = query(badgesRef, where("id", "==", badge.id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    await addDoc(badgesRef, {
      ...badge,
      dateAwarded: serverTimestamp(),
    });

    // Log the badge earning activity
    await logUserActivity(userId, 'badge_earned', { badgeId: badge.id, badgeName: badge.name });
  }
};

/**
 * Fetches a user's gamification data (streak and badges).
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} An object containing the user's streak and badges.
 */
export const getUserGamificationData = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  const badgesRef = collection(db, `users/${userId}/badges`);

  const streakData = userDoc.exists() ? {
    currentStreak: userDoc.data().currentStreak || 0,
    lastActivityDate: userDoc.data().lastActivityDate || null,
  } : { currentStreak: 0, lastActivityDate: null };

  const badgesSnapshot = await getDocs(badgesRef);
  const badges = badgesSnapshot.docs.map(doc => doc.data());

  return {
    streak: streakData,
    badges,
  };
};
