import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLessons } from "../context/LessonsContext";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const [gameQuestions, setGameQuestions] = useState(null);
  const { lessons, updateLessonCompletion } = useLessons();
  const [lessonUpdated, setLessonUpdated] = useState(false);

  const language = location.state?.language || "English";
  const level = location.state?.level || "Beginner";

  const getLessonId = (language, levelTitle) => {
    const lesson = lessons[language]?.find(
      (lesson) => lesson.title.toLowerCase() === levelTitle.toLowerCase()
    );
    return lesson?.id || 1;
  };

  const lessonId = getLessonId(language, level);

  useEffect(() => {
    const questions = location.state?.questions;
    console.log(questions);
    
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      alert("No questions available. Redirecting to home page.");
      navigate("/path");
      return;
    }

    setGameQuestions(questions);
  }, [location, navigate]);

  useEffect(() => {
    if (!gameQuestions) return;

    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let currentQuestionIndex = 0;
    let score = 0;
    let projectiles = [];
    let asteroids = [];
    let player;
    let animationFrameId;
    const PROJECTILE_SPEED = 5;
    const SPEED = 2.5;
    const ROTATIONAL_SPEED = 0.1;

    class Player {
      constructor(position) {
        this.position = position;
        this.rotation = 0;
        this.velocity = { x: 0, y: 0 };
        this.radius = 15;
      }

      draw() {
        c.save();
        c.translate(this.position.x, this.position.y);
        c.rotate(this.rotation);
        c.fillStyle = "red";
        c.beginPath();
        c.arc(0, 0, this.radius, 0, Math.PI * 2);
        c.fill();
        c.restore();

        c.save();
        c.translate(this.position.x, this.position.y);
        c.rotate(this.rotation);
        c.setLineDash([5, 5]);
        c.strokeStyle = "white";
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(50, 0);
        c.stroke();
        c.restore();
      }

      update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;

        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x > canvas.width) this.position.x = canvas.width;
        if (this.position.y < 0) this.position.y = 0;
        if (this.position.y > canvas.height) this.position.y = canvas.height;
      }
    }

    class Projectile {
      constructor(position, velocity) {
        this.position = { ...position };
        this.velocity = velocity;
        this.radius = 5;
      }

      draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "white";
        c.fill();
        c.closePath();
      }

      update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      }
    }

    class Asteroid {
      constructor(position, velocity, text) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 40;
        this.text = text;
      }

      draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle = "white";
        c.stroke();
        c.closePath();

        c.font = "16px Arial";
        c.fillStyle = "white";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(this.text, this.position.x, this.position.y);
      }

      update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x < this.radius) 
          this.velocity.x = Math.abs(this.velocity.x);
        if (this.position.x > canvas.width - this.radius)
          this.velocity.x = -Math.abs(this.velocity.x);
        if (this.position.y < this.radius)
          this.velocity.y = Math.abs(this.velocity.y);
        if (this.position.y > canvas.height - this.radius)
          this.velocity.y = -Math.abs(this.velocity.y);
      }
    }

    function spawnAsteroids() {
      asteroids = [];
      asteroids.length = 0;

      const optionsi = gameQuestions[currentQuestionIndex].options;
      console.log("in astroids",optionsi); 
      const positions = [
        { x: canvas.width * 0.2, y: canvas.height * 0.2 },
        { x: canvas.width * 0.8, y: canvas.height * 0.2 },
        { x: canvas.width * 0.2, y: canvas.height * 0.8 },
        { x: canvas.width * 0.8, y: canvas.height * 0.8 },
      ];

      optionsi.forEach((option, i) => {
        const position = positions[i];
        console.log(position);
        const vx = (Math.random() - 0.5) * SPEED;
        const vy = (Math.random() - 0.5) * SPEED;
        asteroids.push(new Asteroid(position, { x: vx, y: vy }, option));
        console.log("hi",option,i,asteroids); 
      });
      console.log(asteroids);
    }

    function displayQuestion() {
      const questionText = gameQuestions[currentQuestionIndex]?.question || "No question available";
      const questionElement = document.getElementById("question");
      if (questionElement) {
        questionElement.textContent = questionText;
      }
    }

    function checkScore() {
      if (score >= 200 && !lessonUpdated) {
        setLessonUpdated(true);
        updateLessonCompletion(language, lessonId, true);
        alert(`Congratulations! You've completed the ${level} level!`);
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
        checkScore();
        navigate("/path");
      } else {
        spawnAsteroids();
        displayQuestion();
      }
    }

    function checkAnswer(option) {
      const correctAnswer = gameQuestions[currentQuestionIndex].correctAnswer;
      if (option === correctAnswer) {
        score += 100;
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
      c.fillStyle = 'rgba(0, 0, 0, 0.2)';
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
  }, [gameQuestions, navigate, language, lessonId, updateLessonCompletion, lessonUpdated]);

  if (!gameQuestions) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="game-container">
      <div id="question">Question will appear here</div>
      <div id="score">Score: 0</div>
      <div id="feedback"></div>
      <div id="game-over"></div>
      <canvas></canvas>
      <style jsx="true" >{`
          .body {
            margin: 0;
            overflow: hidden;
            font-family: 'Press Start 2P', sans-serif; 
            color: white;
            text-align: center;
            background-image: url('/img/space.png');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
          }
          .canvas {
            background-color: black;
          }
          #question {
            position: absolute;
            top: 40px;
            width: 100%;
            font-size: 40px;
            color: white;
          }
          #score {
            position: absolute;
            top: 120px;
            width: 100%;
            font-size: 30px;
            color: yellow;
          }
          #feedback {
            position: absolute;
            bottom: 30px;
            width: 100%;
            font-size: 24px;
            color: red;
            opacity: 0;
            transition: opacity 0.5s;
          }
          #game-over {
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 36px;
            color: red;
            display: none;
          }
      `}
      </style>

    </div>
    
  );
}