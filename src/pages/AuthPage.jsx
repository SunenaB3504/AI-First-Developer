import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import './AuthPage.css';

/**
 * @file AuthPage component.
 * @description A component that manages and toggles between the login and signup forms.
 */

/**
 * Renders the appropriate authentication form (Login or Signup) and provides a
 * link to toggle between them.
 *
 * @returns {JSX.Element} The rendered AuthPage component.
 */
const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  /**
   * Toggles the view between the login and signup forms.
   */
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="auth-page">
      {isLoginView ? <LoginForm /> : <SignupForm onSignupSuccess={() => setIsLoginView(true)} />}
      <div className="auth-toggle">
        {isLoginView ? (
          <p>
            Don't have an account?{' '}
            <button onClick={toggleView} className="toggle-button">
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button onClick={toggleView} className="toggle-button">
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
