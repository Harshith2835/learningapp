import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Homepage';
import AuthPage from './AuthPage';
import Dashboard from './Dashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App
