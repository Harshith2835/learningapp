import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const [gameQuestions, setGameQuestions] = useState(null);

  useEffect(() => {
    // Check if we have questions in the location state
    const questions = location.state?.questions;
    
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      alert("No questions available. Redirecting to home page.");
      navigate("/");
      return;
    }

    setGameQuestions(questions);
  }, [location, navigate]);

  useEffect(() => {
    // Only initialize the game when we have questions
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
    const PROJECTILE_SPEED = 4;
    const SPEED = 1.5;
    const ROTATIONAL_SPEED = 0.05;

    class Player {
      constructor(position) {
        this.position = position;
        this.rotation = 0;
        this.velocity = { x: 0, y: 0 };
        this.radius = 15; // Radius of the circle player
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

        // Draw direction indicator
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
        
        // Add friction
        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;

        // Prevent going off screen
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
        // Draw asteroid circle
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle = "white";
        c.stroke();
        c.closePath();

        // Draw answer text
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

        // Bounce off walls
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
      asteroids.length = 0;

      const options = gameQuestions[currentQuestionIndex].options;
      const positions = [
        { x: canvas.width * 0.2, y: canvas.height * 0.2 },
        { x: canvas.width * 0.8, y: canvas.height * 0.2 },
        { x: canvas.width * 0.2, y: canvas.height * 0.8 },
        { x: canvas.width * 0.8, y: canvas.height * 0.8 },
      ];

      options.forEach((option, i) => {
        const position = positions[i];
        const vx = (Math.random() - 0.5) * SPEED;
        const vy = (Math.random() - 0.5) * SPEED;
        asteroids.push(new Asteroid(position, { x: vx, y: vy }, option));
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

      // Update and clean up projectiles
      projectiles.forEach((projectile, index) => {
        projectile.update();

        // Remove projectiles that are off screen
        if (
          projectile.position.x < 0 ||
          projectile.position.x > canvas.width ||
          projectile.position.y < 0 ||
          projectile.position.y > canvas.height
        ) {
          projectiles.splice(index, 1);
        }
      });

      // Update asteroids and check collisions
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
      // Initialize player in center of screen
      player = new Player({
        x: canvas.width / 2,
        y: canvas.height / 2,
      });

      // Set up initial game state
      displayQuestion();
      updateScoreDisplay();
      spawnAsteroids();

      // Start game loop
      animate();

      // Add event listener
      window.addEventListener("keydown", handleKeyDown);
    }

    // Initialize the game
    init();

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [gameQuestions, navigate]);

  if (!gameQuestions) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="game-container">
      <div id="question" className="question-display">Question will appear here</div>
      <div id="score" className="score-display">Score: 0</div>
      <canvas className="game-canvas"></canvas>
      
      {/* <style jsx="true">{`
        .game-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: black;
        }

        .question-display {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 24px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.7);
          padding: 10px 20px;
          border-radius: 5px;
        }

        .score-display {
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          font-size: 20px;
          z-index: 10;
        }

        .game-canvas {
          position: absolute;
          top: 0;
          left: 0;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background: black;
          color: white;
          font-size: 24px;
        }
      `}</style> */}
    </div>
  );
}