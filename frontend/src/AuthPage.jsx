import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './styles/authpage.css'

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? false : true; // If 'signup' is passed, start with Sign up
  const [isLogin, setIsLogin] = useState(initialMode);

  const toggleAuthMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  useEffect(() => {
    // Update the form view based on the URL parameter if changed
    setIsLogin(searchParams.get('mode') !== 'signup');
  }, [searchParams]);

  return (
    <div className='auth-page-container'>
        <div className="auth-page">
        <h2>{isLogin ? 'Log in to PixelSpeak' : 'Sign up for PixelSpeak'}</h2>
        
        {isLogin ? (
          <form className="login-form">
            <label>
              Email:
              <input type="email" required />
            </label>
            <label>
              Password:
              <input type="password" required />
            </label>
            <button type="submit">Log in</button>
          </form>
        ) : (
          <form className="signup-form">
            <label>
              Name:
              <input type="text" required />
            </label>
            <label>
              Email:
              <input type="email" required />
            </label>
            <label>
              Password:
              <input type="password" required />
            </label>
            <button type="submit">Sign up</button>
          </form>
        )}
        
        <p className="toggle-auth">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={toggleAuthMode} className="toggle-button">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};