import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import "../styles/path.css";
import { useLessons } from '../components/LessonsContext';

export default function Path() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lessons } = useLessons();

  const language = location.state?.language || "English"; // Default to English if no language is selected
  const languageLessons = lessons[language] || [];

  const [open, setOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);

  const handleLectureClick = (level) => {
    navigate(`/lecture/${level}`, { state: { language, level } });
  };

  const handleDrawerOpen = (level) => {
    setOpen(true);
    setSelectedLecture(level);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setSelectedLecture(null);
  };

  return (
    <div className="lecture-path-page">
      <Header />
      <h3 className="path-title">Learning {language}</h3>

        <div className="lecture-buttons-container">
          {languageLessons.map((lesson, index) => {
            // Beginner level is always unlocked; other levels check if the previous lesson was completed
            const isUnlocked = index === 0 || languageLessons[index - 1].completed;

            return (
              <React.Fragment key={lesson.id}>
                <button
                  className="lecture-button"
                  onClick={() => isUnlocked && handleDrawerOpen(lesson.title)}
                  disabled={!isUnlocked} // Disable button if the level is locked
                >
                  {lesson.title}
                </button>

                {index < languageLessons.length - 1 && (
                  <div className={`progress-line ${isUnlocked ? "completed" : ""}`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      {open && (
        <div className="drawer">
          <div className="drawer-content">
            <h4>{selectedLecture} Level:</h4>
            <button
              className="start-lecture-button"
              onClick={() => {
                handleLectureClick(selectedLecture);
                handleDrawerClose();
              }}
            >
              Start Lecture
            </button>
            <button className="drawer-close-button" onClick={handleDrawerClose}>
              Close
            </button>
          </div>
        </div>
      )}
      <Navigation />
    </div>
  );
}