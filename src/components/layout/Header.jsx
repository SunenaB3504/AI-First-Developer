import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import './Header.css';

const Header = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // The onAuthStateChanged listener in AuthContext will handle the state update
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>AI Learning Platform</h1>
        </Link>
        <nav className="main-nav">
          {currentUser && (
            <>
              <Link to="/">Learn</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/analytics">Analytics</Link>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
