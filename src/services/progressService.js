import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Assuming you have a firebase.js config file
import { logUserActivity } from './analyticsService';

const progressCollection = 'userProgress';

/**
 * Fetches the array of completed lesson IDs for a given user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<string[]>} A promise that resolves to an array of completed lesson IDs.
 */
export const getUserProgress = async (userId) => {
  if (!userId) return [];
  try {
    const docRef = doc(db, progressCollection, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().completedLessons || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return [];
  }
};

/**
 * Adds a new lessonId to the user's completedLessons array.
 * This operation is idempotent.
 * @param {string} userId - The ID of the user.
 * @param {string} lessonId - The ID of the lesson to mark as completed.
 * @returns {Promise<void>}
 */
export const updateUserProgress = async (userId, lessonId) => {
  if (!userId || !lessonId) return;
  try {
    const docRef = doc(db, progressCollection, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists, update the array
      await updateDoc(docRef, {
        completedLessons: arrayUnion(lessonId)
      });
    } else {
      // Document doesn't exist, create it
      await setDoc(docRef, {
        completedLessons: [lessonId]
      });
    }

    // Log the activity
    await logUserActivity(userId, 'lesson_completed', { lessonId });
  } catch (error) {
    console.error("Error updating user progress:", error);
  }
};
