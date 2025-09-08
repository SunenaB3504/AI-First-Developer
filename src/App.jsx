import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Layout from './components/layout/Layout';
import AuthPage from './components/auth/AuthPage';
import LearningLayout from './components/learning/LearningLayout';
import { ProgressProvider } from './context/ProgressContext';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ProgressProvider>
      <Layout>
        {user ? <LearningLayout /> : <AuthPage />}
      </Layout>
    </ProgressProvider>
  );
}

export default App;
