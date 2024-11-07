import React, { useState } from 'react';
import './styles/dashboard.css'; 
import Header from './Header'

const lessonsData = [
  { id: 1, title: 'Lesson 1: Basics', completed: 20 },
  { id: 2, title: 'Lesson 2: Grammar', completed: 80 },
  { id: 3, title: 'Lesson 3: Vocabulary', completed: 40 },
  { id: 4, title: 'Lesson 4: Pronunciation', completed: 100 },
  { id: 5, title: 'Lesson 5: Writing', completed: 60 }
];

export default function Dashboard () {

  const [lessons, setLessons] = useState(lessonsData);

  const totalProgress = lessons.reduce((acc, lesson) => acc + lesson.completed, 0);
  const progressPercentage = totalProgress / lessons.length;

  return (
    <>    
      <Header></Header>
      <div className="dashboard-container">
          {/* Progress Bar */}
          <div className="progress-bar-background">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          {/* Dashboard Content */}
          <div className="dashboard-content">
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="lessons-list">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="lesson-item">
                  <div>
                    <h3 className="lesson-title">{lesson.title}</h3>
                    <p className="lesson-progress">Progress: {lesson.completed}%</p>
                  </div>
                  <div className="lesson-progress-bar-background">
                    <div
                      className="lesson-progress-bar"
                      style={{ width: `${lesson.completed}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>

  );
};