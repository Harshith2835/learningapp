# PixelSpeak 🌍🕹️

**PixelSpeak** is a gamified language-learning app that offers an interactive and engaging experience for users to learn new languages through games and lessons. With multiple language options, progress tracking, and mini-games like the Asteroid Quiz Game, PixelSpeak makes language learning fun and adaptive.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Application Flow](#application-flow)
- [Asteroid Quiz Game](#asteroid-quiz-game)
- [Backend](#backend)
- [Frontend](#frontend)
- [Setup Instructions](#setup-instructions)
- [License](#license)

---

## Overview
PixelSpeak uses a combination of interactive lessons and games to help users learn languages. Once logged in, users can access a dashboard displaying their progress, leaderboard rankings, and options to select or change languages. The app dynamically generates language lessons using the Gemini API, providing a customized experience based on the user's selected language.

---

## Features
- **User Authentication**: Secure login for users to track their language progress.
- **Multiple Languages**: Learn from a selection of languages with unique lessons.
- **Interactive Dashboard**: Track progress, select languages, and view leaderboard standings.
- **Dynamic Lesson Generation**: Lessons and questions are created using the Gemini API.
- **Asteroid Quiz Game**: A mini-game designed to make vocabulary practice fun and engaging.

---

## Technologies Used
### Backend
- **Node.js & Express**: Server setup and API handling
- **MongoDB**: Database to store user information and progress
- **Cors**: Cross-origin resource sharing for client-server interactions

### Frontend
- **React**: Component-based UI for interactive learning experiences
- **React Router**: Navigation across various app pages
- **Context API**: State management for handling lessons and user data
- **Axios**: API calls to backend for lesson generation and user data retrieval

---

## Application Flow
1. **Login/Sign-Up**: Users begin by logging in or creating an account, gaining access to their unique dashboard.
2. **Dashboard**: Shows user’s progress, leaderboard ranking, and available languages.
3. **Language Selection**: Clicking "Choose Language" directs users to a page where they select a language to learn.
4. **Lesson Generation**: Based on the chosen language, the frontend triggers a backend route (`/api/lessons/generate`), which uses the Gemini API to create relevant lessons.
5. **Learning and Gameplay**: Users engage with lessons and practice vocabulary through the Asteroid Quiz Game and other activities.

---

## Asteroid Quiz Game
The **Asteroid Quiz Game** is designed as a vocabulary practice module where users match words with their translations. 

### How to Play:
1. **Start the Game**: Click the "Start Game" button.
2. **Match Words and Translations**: Asteroids with vocabulary words will descend from the top of the screen. Your task is to select the correct translation from the options before the asteroid reaches the bottom.
3. **Score Points**: Each correct answer earns points. The game increases in difficulty as your score rises, making it more challenging to keep up with new words.
4. **End of Game**: The game ends after a set time or when a certain number of asteroids reach the bottom without being answered.

---

## Backend
The backend is built with **Node.js** and **Express**, providing endpoints for user authentication, lesson generation, and progress tracking.

### File Structure:
- `app.js`: Initializes the Express server, connects to the database, and sets up routes.
- `/routes/userRoutes.js`: Handles user-related routes, such as login and signup.
- `/routes/lessonRoutes.js`: Manages lesson generation and retrieval.
- `/config/dbconfig.js`: MongoDB configuration and connection setup.

### Backend Routes
- **`/api/users`**: Handles user registration, login, and profile management.
- **`/api/lessons/generate`**: Calls the Gemini API to dynamically generate lessons based on the user's selected language.

---

## Frontend
The frontend is developed using **React** and utilizes **React Router** for navigation.

### File Structure:
- `App.jsx`: Defines routes and wraps the app in the LessonsProvider for state management.
- `/pages`: Contains the main pages like HomePage, AuthPage, Dashboard, and Game.
- `/context/LessonsContext.js`: Provides global state for lessons and user progress.
  
### Frontend Routes
- **`/auth`**: Authentication page for login/sign-up.
- **`/dashboard`**: User’s main dashboard displaying language options, leaderboard, and progress.
- **`/language`**: Language selection page to choose a new language for learning.
- **`/game`**: Page where users can access the Asteroid Quiz Game.

---

## Setup Instructions

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/pixelspeak.git
    cd pixelspeak
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables in a `.env` file:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    GEMINI_API_KEY=your_gemini_api_key
    ```
4. Start the server:
    ```bash
    npm run server
    ```

### Frontend Setup
1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend:
    ```bash
    npm start
    ```
4. Open your browser and go to `http://localhost:3000`.


---

*Happy Learning with PixelSpeak! 🌟*
