import { useNavigate } from 'react-router-dom';
import '../styles/language.css';

export default function Language() {
  const navigate = useNavigate();

  const handleLanguageSelection = (language) => {
    navigate('/path', { state: { language } });
  };

  return (
    <div class="language-container">
      <div class="blurred-box">
        <p>Choose Your Language</p>
        <div class="language-buttons">
          <button>English</button>
          <button>Telugu</button>
          <button>Hindi</button>
        </div>
      </div>
    </div>
  );
}