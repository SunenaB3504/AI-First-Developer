import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getUserProgress, updateUserProgress } from '../services/progressService';
import { updateLearningStreak, awardBadge, getUserGamificationData } from '../services/gamificationService';
import { badges } from '../data/badges';
import { modules } from '../data/lessons';
import { auth } from '../firebase/config'; // Assuming auth service for user ID

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        getUserProgress(currentUser.uid)
          .then(progress => {
            setCompletedLessons(new Set(progress));
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setCompletedLessons(new Set());
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const markLessonCompleted = (lessonId) => {
    if (user && completedLessons && !completedLessons.has(lessonId)) {
      const newCompletedLessons = new Set(completedLessons);
      newCompletedLessons.add(lessonId);
      setCompletedLessons(newCompletedLessons);
      updateUserProgress(user.uid, lessonId);

      // Gamification logic
      updateLearningStreak(user.uid).then(async () => {
        const gamificationData = await getUserGamificationData(user.uid);
        const { streak } = gamificationData;
        if (streak.currentStreak === 5) {
          const streakBadge = badges.find(b => b.id === 'streak-5');
          if (streakBadge) {
            awardBadge(user.uid, streakBadge);
          }
        }
      });

      const module = modules.find(m => m.sections.some(l => l.id === lessonId));
      if (module) {
        const allLessonsInModuleCompleted = module.sections.every(l => newCompletedLessons.has(l.id));
        if (allLessonsInModuleCompleted) {
          const moduleBadge = badges.find(b => b.id === `${module.id}-novice`);
          if (moduleBadge) {
            awardBadge(user.uid, moduleBadge);
          }
        }
      }
    }
  };

  const value = {
    completedLessons,
    markLessonCompleted,
    loading
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

ProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
