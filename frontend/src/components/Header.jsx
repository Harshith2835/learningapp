import { Link } from 'react-router-dom';
import '../styles/header.css';

export default function Header({ isLoggedIn }) {
  return (
    <header className='header'>
      <svg className="title-img" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
      </svg>
      <h2 className="web-title">PixelSpeak</h2>

      {/* Conditionally render buttons if logged in */}
      {isLoggedIn && (
        <div className="header-buttons">
          <Link to="/language">
            <button className="choose-language-button">Choose Language</button>
          </Link>
          <Link to="/auth">
            <button className="logout-button">Logout</button>
          </Link>
        </div>
      )}
    </header>
  );
}
