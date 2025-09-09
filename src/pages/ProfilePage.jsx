/**
 * @file ProfilePage.jsx
 * @description A page for users to view their gamification achievements (streaks and badges).
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserGamificationData } from '../services/gamificationService';
import LearningStreak from '../components/gamification/LearningStreak';
import BadgeCard from '../components/gamification/BadgeCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [gamificationData, setGamificationData] = useState({ streak: { currentStreak: 0 }, badges: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGamificationData = async () => {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await getUserGamificationData(currentUser.uid);
        setGamificationData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load profile data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGamificationData();
  }, [currentUser]);

  if (isLoading) {
    return <div className="profile-page"><h2>Loading Profile...</h2></div>;
  }

  if (error) {
    return <div className="profile-page"><p className="error-message">{error}</p></div>;
  }

  if (!currentUser) {
    return <div className="profile-page"><h2>Please log in to view your profile.</h2></div>;
  }

  return (
    <div className="profile-page">
      <h1>My Achievements</h1>
      <LearningStreak currentStreak={gamificationData.streak.currentStreak} />
      
      <div className="badges-section">
        <h2>My Badges</h2>
        {gamificationData.badges.length > 0 ? (
          <div className="badges-grid">
            {gamificationData.badges.map(badge => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        ) : (
          <p>You haven't earned any badges yet. Keep learning to unlock them!</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
