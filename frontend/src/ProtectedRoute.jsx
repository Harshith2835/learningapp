// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your loading spinner component
  }

  if (!user) {
    return <Navigate to="/auth?mode=login" />;
  }

  return children;
};

export default ProtectedRoute;