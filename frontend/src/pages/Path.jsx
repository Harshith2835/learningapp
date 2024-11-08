import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import "../styles/path.css";

export default function Path() {
  const location = useLocation();
  const language = location.state?.language || "English"; // default to English if no language is selected

  const [unlockedLectures, setUnlockedLectures] = useState(1);
  const [lectureContent, setLectureContent] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);

  // Fetch lecture content from backend
  useEffect(() => {
    fetch("https://localhost:3000/api/lessons/hindi/beginner") // Replace with actual API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch lecture content");
        }
        return response.json();
      })
      .then((data) => {
        setLectureContent(data.lectures);
      })
      .catch((error) =>
        console.error("Error fetching lecture content:", error)
      );
  }, []);

  // Retrieve unlocked lectures from localStorage
  useEffect(() => {
    const storedUnlockedLectures = JSON.parse(
      localStorage.getItem("unlockedLectures")
    );
    if (storedUnlockedLectures) {
      setUnlockedLectures(storedUnlockedLectures);
    } else {
      localStorage.setItem("unlockedLectures", JSON.stringify(1));
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("lecture-path-page");
    return () => {
      document.body.classList.remove("lecture-path-page");
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

  const levels = ["Beginner", "Intermediate", "Expert"];

  return (
    <div className="lecture-path-page">
      <Header />
      <h3 className="path-title">Learning {language}</h3>

      <div className="lecture-buttons-container">
        {lectureContent.map((lecture, index) => (
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
              {levels[index] || "Unknown Level"}{" "}
              {/* Render level based on index */}
            </button>

            {/* Render progress bar between buttons */}
            {index < lectureContent.length - 1 && (
              <div
                className={`progress-line ${
                  index < unlockedLectures - 1 ? "completed" : ""
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {open && (
        <div className="drawer">
          <div className="drawer-content">
            <h4>{selectedLecture?.title.split(":")[0]}:</h4>
            <h5>{selectedLecture?.title.split(":")[1]}</h5>
            <button
              className="start-lecture-button"
              onClick={() => {
                handleLectureClick(lectureContent.indexOf(selectedLecture) + 1);
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
