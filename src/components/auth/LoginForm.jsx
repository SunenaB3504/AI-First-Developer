import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './LoginForm.css';

/**
 * @file LoginForm component.
 * @description Provides a form for users to sign in with email/password or Google.
 */

/**
 * A component that renders a login form for email/password and Google sign-in.
 *
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  /**
   * Handles sign-in with email and password.
   * @param {React.FormEvent} e - The form event.
   */
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Handles sign-in with Google popup.
   */
  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleEmailSignIn} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <button onClick={handleGoogleSignIn} className="google-signin-button">
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginForm;
