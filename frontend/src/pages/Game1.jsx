import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLessons } from "../context/LessonsContext";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lessons, updateLessonCompletion } = useLessons();

  const [gameQuestions, setGameQuestions] = useState(null);
  const [score, setScore] = useState(0);
  const [language, setLanguage] = useState("English");
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  useEffect(() => {
    const questions = location.state?.questions;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      alert("No questions available. Redirecting to home page.");
      navigate("/dashboard");
      return;
    }

    setGameQuestions(questions);
  }, [location, navigate]);

  useEffect(() => {
    if (score >= 500 && !isLessonCompleted) {
      setIsLessonCompleted(true);
      updateLessonCompletion(language, 1, true);
    }
  }, [score, language, updateLessonCompletion, isLessonCompleted]);

  useEffect(() => {
    if (!gameQuestions) return;

    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let currentQuestionIndex = 0;
    let projectiles = [];
    let asteroids = [];
    let player;
    let animationFrameId;
    const PROJECTILE_SPEED = 4;
    const SPEED = 1.5;
    const ROTATIONAL_SPEED = 0.05;

    class Player {
      constructor(position) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.rotation = 0;
      }

      draw() {
        c.save();
        c.translate(this.position.x, this.position.y);
        c.rotate(this.rotation);
        c.fillStyle = "blue";
        c.beginPath();
        c.moveTo(30, 0);
        c.lineTo(-10, -10);
        c.lineTo(-10, 10);
        c.closePath();
        c.fill();
        c.restore();
      }

      update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
      }
    }

    class Projectile {
      constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 5;
      }

      draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "red";
        c.fill();
        c.closePath();
      }

      update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
      }
    }

    class Asteroid {
      constructor(position, text) {
        this.position = position;
        this.velocity = {
          x: (Math.random() - 0.5) * SPEED,
          y: (Math.random() - 0.5) * SPEED,
        };
        this.radius = 30;
        this.text = text;
      }

      draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "green";
        c.fill();
        c.closePath();

        c.fillStyle = "white";
        c.textAlign = "center";
        c.font = "16px Arial";
        c.fillText(this.text, this.position.x, this.position.y + 5);
      }

      update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
      }
    }

    function spawnAsteroids() {
      asteroids = gameQuestions[currentQuestionIndex].options.map((option) => {
        return new Asteroid(
          {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
          },
          option
        );
      });
    }

    function displayQuestion() {
      const questionText =
        gameQuestions[currentQuestionIndex]?.question || "No question available";
      const questionElement = document.getElementById("question");
      if (questionElement) {
        questionElement.textContent = questionText;
      }
    }

    function updateScoreDisplay() {
      const scoreElement = document.getElementById("score");
      if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
      }
    }

    function nextQuestion() {
      currentQuestionIndex++;
      if (currentQuestionIndex >= gameQuestions.length) {
        alert(`Game Over! Your final score is ${score}`);
        navigate("/");
      } else {
        spawnAsteroids();
        displayQuestion();
      }
    }

    function checkAnswer(option) {
      const correctAnswer = gameQuestions[currentQuestionIndex].correctAnswer;
      if (option === correctAnswer) {
        setScore(prevScore => prevScore + 100);
        alert("Correct!");
      } else {
        alert("Wrong Answer!");
      }
      updateScoreDisplay();
      nextQuestion();
    }

    function checkCollisions() {
      projectiles.forEach((projectile, projectileIndex) => {
        asteroids.forEach((asteroid, asteroidIndex) => {
          const dist = Math.hypot(
            projectile.position.x - asteroid.position.x,
            projectile.position.y - asteroid.position.y
          );

          if (dist < asteroid.radius + projectile.radius) {
            checkAnswer(asteroid.text);
            projectiles.splice(projectileIndex, 1);
            asteroids.splice(asteroidIndex, 1);
          }
        });
      });
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      c.fillStyle = "rgba(0, 0, 0, 0.2)";
      c.fillRect(0, 0, canvas.width, canvas.height);

      player.update();
      projectiles.forEach((projectile, index) => {
        projectile.update();
        if (
          projectile.position.x < 0 ||
          projectile.position.x > canvas.width ||
          projectile.position.y < 0 ||
          projectile.position.y > canvas.height
        ) {
          projectiles.splice(index, 1);
        }
      });
      asteroids.forEach((asteroid) => {
        asteroid.update();
      });
      checkCollisions();
    }

    function handleKeyDown(event) {
      switch (event.code) {
        case "KeyW":
          player.velocity.x = Math.cos(player.rotation) * SPEED;
          player.velocity.y = Math.sin(player.rotation) * SPEED;
          break;
        case "KeyA":
          player.rotation -= ROTATIONAL_SPEED;
          break;
        case "KeyD":
          player.rotation += ROTATIONAL_SPEED;
          break;
        case "Space":
          event.preventDefault();
          const velocity = {
            x: Math.cos(player.rotation) * PROJECTILE_SPEED,
            y: Math.sin(player.rotation) * PROJECTILE_SPEED,
          };
          const bulletStartPos = {
            x: player.position.x + Math.cos(player.rotation) * 50,
            y: player.position.y + Math.sin(player.rotation) * 50,
          };
          projectiles.push(new Projectile(bulletStartPos, velocity));
          break;
      }
    }

    function init() {
      player = new Player({
        x: canvas.width / 2,
        y: canvas.height / 2,
      });
      displayQuestion();
      updateScoreDisplay();
      spawnAsteroids();
      animate();
      window.addEventListener("keydown", handleKeyDown);
    }

    init();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [gameQuestions, navigate, score]);

  if (!gameQuestions) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="game-container">
      <div id="question" className="question-display">Question will appear here</div>
      <div id="score" className="score-display">Score: 0</div>
      <canvas className="game-canvas"></canvas>
    </div>
  );
}