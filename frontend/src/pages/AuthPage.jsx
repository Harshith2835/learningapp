import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/authpage.css'
import Header from '../components/Header';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? false : true; // If 'signup' is passed, start with Sign up
  const [isLogin, setIsLogin] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (email === 'mern@gmail.com' && password === '12345') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid email or password');
    }
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    // Handle signup logic here, e.g., send data to an API
    alert('Signup is not implemented yet');
  };

  useEffect(() => {
    // Update the form view based on the URL parameter if changed
    setIsLogin(searchParams.get('mode') !== 'signup');
  }, [searchParams]);

  return (
    <>
      <Header></Header>
      <div className='auth-page-container'>
        <div className="auth-page">
          <h2>{isLogin ? 'Log in to PixelSpeak' : 'Sign up for PixelSpeak'}</h2>

          {isLogin ? (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Log in</button>
            </form>
          ) : (
            <form className="signup-form" onSubmit={handleSignupSubmit}>
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

          {/* If authenticated, show link to dashboard */}
          {isAuthenticated && (
            <div className="auth-success">
              <p>Login successful!</p>
              <Link to="/start" className="dashboard-link">Go to Dashboard</Link>
            </div>
          )}
        </div>
      </div>
    </>

  );
}