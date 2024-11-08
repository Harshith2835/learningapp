import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import parsedLectureContent from '../data/parsedLectureContent.json';
import Header from '../components/Header';
import '../styles/path.css';

export default function Path() {

  const location = useLocation();
  const language = location.state?.language || 'English'; // default to English if no language is selected

  const [unlockedLectures, setUnlockedLectures] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  
  useEffect(() => {
    const storedUnlockedLectures = JSON.parse(localStorage.getItem('unlockedLectures'));
    if (storedUnlockedLectures) {
      setUnlockedLectures(storedUnlockedLectures);
    } else {
      localStorage.setItem('unlockedLectures', JSON.stringify(1));
    }
  }, []);

  useEffect(() => {
    document.body.classList.add('lecture-path-page');
    return () => {
      document.body.classList.remove('lecture-path-page');
    };
  }, []);

  const navigate = useNavigate();

  const handleLectureClick = (id) => {
    if (id <= unlockedLectures) {
      navigate(`/lecture/${id}`, { state: { language } });
    }
  };

  const handleDrawerOpen = (lecture) => {
    setOpen(true);
    setSelectedLecture(lecture);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setSelectedLecture(null);
  };

  const levels = ['Beginner', 'Intermediate', 'Expert'];

  return (
    <div className='lecture-path-page'>
      <Header />
      <h3 className="path-title">Learning {language}</h3>

      <div className="lecture-buttons-container">
          {parsedLectureContent.lectures.map((lecture, index) => (
            <React.Fragment key={index}>
              <button
                className="lecture-button"
                disabled={index + 1 > unlockedLectures}
                onClick={() => {
                  if (index + 1 <= unlockedLectures) {
                    handleDrawerOpen(lecture);
                  }
                }}
              >
                {levels[index] || 'Unknown Level'} {/* Render level based on index */}
              </button>

              {/* Render progress bar between buttons */}
              {index < parsedLectureContent.lectures.length - 1 && (
                <div
                  className={`progress-line ${index < unlockedLectures - 1 ? 'completed' : ''}`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

      {open && (
        <div className="drawer">
          <div className="drawer-content">
            <h4>{selectedLecture?.title.split(':')[0]}:</h4>
            <h5>{selectedLecture?.title.split(':')[1]}</h5>
            <button
              className="start-lecture-button"
              onClick={() => {
                handleLectureClick(parsedLectureContent.lectures.indexOf(selectedLecture) + 1);
                handleDrawerClose();
              }}
            >
              Start Lecture
            </button>
            <button className="drawer-close-button" onClick={handleDrawerClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}