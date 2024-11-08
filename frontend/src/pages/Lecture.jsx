// src/components/LectureContent.jsx
import React, { useState } from 'react';
import parsedLectureContent from '../data/source.json';
import '../styles/lecture.css';
import { useLocation } from 'react-router-dom';


export default function LectureContent() {
  const { level, content, questions } = parsedLectureContent;
  const [showQuestions, setShowQuestions] = useState(false);

  const location = useLocation();
  const { language } = location.state || { language: 'English' };  // default to 'English' if no language is passed

  const handleStartGame = () => {
    setShowQuestions(true);
  };

  return (
    <div className="lecture-content">
      {/* Display Topic and Level */}
      <header className="lecture-header">
        <h2>Topic: {language}</h2>
        <p>Level: {level}</p>
      </header>

      {/* Display Content */}
      <section className="lecture-body">
        <h3>Introduction</h3>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </section>

      {/* Start Game Button */}
      {!showQuestions && (
        <div className="start-game">
          <button onClick={handleStartGame} className="start-game-button">
            Start Game
          </button>
        </div>
      )}

      {/* Display Questions if Start Game is clicked */}
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