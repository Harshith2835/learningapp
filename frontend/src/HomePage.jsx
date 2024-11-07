import './styles/homepage.css'
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage(){
  return (
    <div className='homepage-section'>
      <img className="homepage-img" src= "/src/assets/homepage-image.webp" alt="" />
      <div className='login-section'>
        <h3>Welcome to PixelSpeak</h3>
        <p>Learn languages in a fun and interactive way</p>

        <Link to="/auth?mode=login">
          <button className='login-button'>Log in</button>
        </Link>
        <p>or</p>
        <Link to="/auth?mode=signup">
          <button className='signup-button'>Sign up</button>
        </Link>      
      </div>
    </div>
  )
}