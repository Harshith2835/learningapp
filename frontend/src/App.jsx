import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Start from "./pages/Start";
import Path from "./pages/Path";
// import Lecture from "./pages/Lecture";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/start" element={<Start />} />
        <Route path="/path" element={<Path />} />
        {/* <Route path="/lecture/:id" element={<Lecture />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
