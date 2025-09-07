import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Layout from './components/layout/Layout';
import UserProfile from './components/profile/UserProfile';
import LoginForm from './components/auth/LoginForm';
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
    <Layout>
      {user ? <UserProfile /> : <LoginForm />}
    </Layout>
  );
}

export default App;
