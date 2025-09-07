import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { getUserProgress, createUserProgress } from '../../firebase/progressService';
import './UserProfile.css';

/**
 * @file UserProfile component.
 * @description Displays the logged-in user's information, progress, and a logout button.
 */

/**
 * A component that displays the current user's profile and progress information.
 *
 * @returns {JSX.Element} The rendered UserProfile component.
 */
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const progressDoc = await getUserProgress(currentUser.uid);
        if (progressDoc.exists()) {
          setProgress(progressDoc.data());
        } else {
          // If no progress doc, create one
          await createUserProgress(currentUser.uid);
          const newProgressDoc = await getUserProgress(currentUser.uid);
          setProgress(newProgressDoc.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * Handles the user logout process.
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProgress(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return <div>Please log in to see your profile.</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Display Name:</strong> {user.displayName || 'Not set'}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="progress-info">
        <h3>Your Progress</h3>
        {progress ? (
          <>
            <p>Completed Modules: {progress.completedModules.join(', ') || 'None'}</p>
            <p>Completed Lessons: {progress.completedLessons.join(', ') || 'None'}</p>
          </>
        ) : (
          <p>Loading progress...</p>
        )}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
