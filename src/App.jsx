import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import AuthPage from './pages/AuthPage';
import LearningLayout from './components/learning/LearningLayout';
import PortfolioPage from './pages/PortfolioPage';
import ProfilePage from './pages/ProfilePage';
import { ProgressProvider } from './context/ProgressContext';
import './App.css';

const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={!currentUser ? <AuthPage /> : <Navigate to="/" />} />
      <Route path="/" element={currentUser ? <LearningLayout /> : <Navigate to="/auth" />} />
      <Route path="/portfolio" element={currentUser ? <PortfolioPage /> : <Navigate to="/auth" />} />
      <Route path="/profile" element={currentUser ? <ProfilePage /> : <Navigate to="/auth" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
