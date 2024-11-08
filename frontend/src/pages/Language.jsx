import { useNavigate } from 'react-router-dom';
import '../styles/language.css';

export default function Language() {
  const navigate = useNavigate();

  const handleLanguageSelection = (language) => {
    navigate('/path', { state: { language } });
  };

  return (
    <div className="language-container">
      <p>Select Language</p>
      <div className="language-buttons">
        <button onClick={() => handleLanguageSelection('English')}>English</button>
        <button onClick={() => handleLanguageSelection('Hindi')}>Hindi</button>
        <button onClick={() => handleLanguageSelection('Telugu')}>Telugu</button>
      </div>
    </div>
  );
}