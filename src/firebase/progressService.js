import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

const progressCollection = 'progress';

/**
 * @file Progress service for interacting with Firestore.
 * @description This file contains functions for creating, retrieving, and updating user progress data.
 */

/**
 * Creates a new progress document for a user in Firestore.
 * This is typically called when a user registers.
 *
 * @param {string} userId - The user's unique ID.
 * @returns {Promise<void>} A promise that resolves when the document is created.
 */
export const createUserProgress = (userId) => {
  const progressRef = doc(db, progressCollection, userId);
  return setDoc(progressRef, {
    userId,
    completedModules: [],
    completedLessons: [],
    lastAccessed: serverTimestamp(),
  });
};

/**
 * Retrieves a user's progress document from Firestore.
 *
 * @param {string} userId - The user's unique ID.
 * @returns {Promise<import("firebase/firestore").DocumentSnapshot>} A promise that resolves with the document snapshot.
 */
export const getUserProgress = (userId) => {
  const progressRef = doc(db, progressCollection, userId);
  return getDoc(progressRef);
};

/**
 * Updates a user's progress document in Firestore.
 *
 * @param {string} userId - The user's unique ID.
 * @param {object} progressData - The data to update.
 * @returns {Promise<void>} A promise that resolves when the document is updated.
 */
export const updateUserProgress = (userId, progressData) => {
  const progressRef = doc(db, progressCollection, userId);
  return updateDoc(progressRef, {
    ...progressData,
    lastAccessed: serverTimestamp(),
  });
};
