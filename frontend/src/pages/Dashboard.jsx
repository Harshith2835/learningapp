import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import Header from '../components/Header';
import { useLessons } from '../components/LessonsContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { lessons } = useLessons();

  const handlePathNavigation = (language) => {
    navigate('/path', { state: { language } });
  };

  return (
    <>
      <Header />
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-container">

        {Object.keys(lessons).map((language) => (
          <div key={language} className="language-section">
            <h3>{language}</h3>

            {/* Progress Bar for each language */}
            <div className="progress-bar-background">
              <div
                className="progress-bar"
                style={{ width: `${calculateProgressPercentage(lessons[language])}%` }}
              ></div>
            </div>

            {/* Display individual lessons' progress */}
            <div className="lessons-list">
              {lessons[language].map((lesson, index) => (
                <div key={index} className="lesson-item">
                  <div>
                    <h4 className="lesson-title">{lesson.title}</h4>
                    <p className="lesson-progress">
                      {lesson.completed ? 'Completed' : 'Not Completed'}
                    </p>
                  </div>
                  <div className="lesson-progress-bar-background">
                    <div
                      className="lesson-progress-bar"
                      style={{ width: `${lesson.completed ? 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {/* Button to navigate to Path page for the selected language */}
            <button
              className="start-path-button"
              onClick={() => handlePathNavigation(language)}
            >
              Go to Path
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

// Utility function to calculate progress percentage
function calculateProgressPercentage(lessons) {
  const totalProgress = lessons.reduce((acc, lesson) => acc + (lesson.completed ? 1 : 0), 0);
  return (totalProgress / lessons.length) * 100;
}