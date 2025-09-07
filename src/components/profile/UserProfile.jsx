import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import './UserProfile.css';

/**
 * @file UserProfile component.
 * @description Displays the logged-in user's information and a logout button.
 */

/**
 * A component that displays the current user's profile information
 * and provides a button to log out.
 *
 * @returns {JSX.Element} The rendered UserProfile component.
 */
const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    /**
     * Subscribes to authentication state changes.
     * Updates the user state when the user logs in or out.
     */
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  /**
   * Handles the user logout process.
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
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
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
