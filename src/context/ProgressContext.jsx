import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getUserProgress, updateUserProgress } from '../services/progressService';
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
    if (user && !completedLessons.has(lessonId)) {
      const newCompletedLessons = new Set(completedLessons);
      newCompletedLessons.add(lessonId);
      setCompletedLessons(newCompletedLessons);
      updateUserProgress(user.uid, lessonId);
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
