import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserProgress } from '../../firebase/progressService';
import './SignupForm.css';

/**
 * @file SignupForm component.
 * @description Provides a form for new users to sign up with email and password.
 */

/**
 * A component that renders a signup form.
 * @param {object} props - The props object.
 * @param {Function} props.onSignupSuccess - Callback function to execute on successful signup.
 */
const SignupForm = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  /**
   * Handles the user signup process.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Create a progress document for the new user
      await createUserProgress(user.uid);
      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="signup-email">Email</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="signup-password">Password</label>
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
