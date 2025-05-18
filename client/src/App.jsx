import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Dictionary from './pages/Dictionary';
import NavbarPublic from './components/NavbarPublic';
import NavbarPrivate from './components/NavbarPrivate';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import CheckGrammarPage from './pages/CheckGrammarPage';
import ListenPage from './pages/ListenPage';

function AppRoutes() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(token);

  const isPrivate = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/dictionary') || location.pathname.startsWith('/listening') || location.pathname.startsWith('/grammar');

  return (
    <>
      <main>
        {isPrivate && isAuthenticated ? <NavbarPrivate /> : <NavbarPublic />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <HomePage />} />
          <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />} />
          <Route path="/signin" element={!isAuthenticated ? <SignIn /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
          <Route path="/listening" element={isAuthenticated ? <ListenPage /> : <Navigate to="/signin" />} />
          <Route path="/grammar" element={isAuthenticated ? <CheckGrammarPage /> : <Navigate to="/signin" />} />
          <Route path="/dictionary" element={isAuthenticated ? <Dictionary /> : <Navigate to="/signin" />} />
          <Route path='*' element={<NotFoundPage/>} />
          {/* TODO: thêm route cho /listening và /grammar */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}