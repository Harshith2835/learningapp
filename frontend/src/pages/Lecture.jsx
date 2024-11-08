// src/components/LectureContent.jsx
import React, { useState, useEffect } from 'react';
import '../styles/lecture.css';
import { useLocation } from 'react-router-dom';

export default function LectureContent() {
  const location = useLocation();
  const { language, level } = location.state || {language:'English',level:'Beginner'};
  const [content, setContent] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    // Fetch lesson content from backend
    const fetchLessonContent = async () => {
      try {
        const response = await fetch(`/api/lessons/${language}/${level}`);
        const data = await response.json();
        setContent(data.content);
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching lesson content:', error);
      }
    };

    fetchLessonContent();
  }, [language, level]);

  const handleStartGame = () => {
    setShowQuestions(true);
  };

  return (
    <div className="lecture-content">
      <header className="lecture-header">
        <h2>Topic: {language}</h2>
        <p>Level: {level}</p>
      </header>

      <section className="lecture-body">
        <h3>Introduction</h3>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </section>

      {!showQuestions && (
        <div className="start-game">
          <button onClick={handleStartGame} className="start-game-button">
            Start Game
          </button>
        </div>
      )}

      {showQuestions && (
        <section className="lecture-questions">
          <h3>Questions</h3>
          {questions.map((questionItem, index) => (
            <div key={questionItem._id} className="question-item">
              <p>
                <strong>Q{index + 1}: </strong>
                {questionItem.question}
              </p>
              <div className="options">
                {questionItem.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="option">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}