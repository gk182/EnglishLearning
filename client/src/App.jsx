import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Dictionary from './pages/Dictionary';
import NavbarPublic from './components/navbar/NavbarPublic';
import NavbarPrivate from './components/navbar/NavbarPrivate';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import CheckGrammarPage from './pages/CheckGrammarPage';
import ListenPage from './pages/ListenPage';
import AdminDashboard from './admin/pages/dashboard';

function AppRoutes() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isAuthenticated = Boolean(token);

  const isPrivate = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/dictionary') || location.pathname.startsWith('/listening') || location.pathname.startsWith('/grammar');
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <main>
        {isAdmin ? null : isPrivate && isAuthenticated  ? <NavbarPrivate />: <NavbarPublic />}
        <Routes>
          <Route path="/" element={isAuthenticated ? (role === "admin" ? <Navigate to="/admin" /> : <Dashboard />) : <HomePage />} />
          <Route path="/signup" element={!isAuthenticated ? <SignUp /> : (role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />)} />
          <Route path="/signin" element={!isAuthenticated ? <SignIn /> : (role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />)} />
          <Route path="/dashboard" element={isAuthenticated && role !== "admin" ? <Dashboard /> : <Navigate to={isAuthenticated ? "/admin" : "/signin"} />} />
          <Route path="/listening" element={isAuthenticated && role !== "admin" ? <ListenPage /> : <Navigate to={isAuthenticated ? "/admin" : "/signin"} />} />
          <Route path="/grammar" element={isAuthenticated && role !== "admin" ? <CheckGrammarPage /> : <Navigate to={isAuthenticated ? "/admin" : "/signin"} />} />
          <Route path="/dictionary" element={isAuthenticated && role !== "admin" ? <Dictionary /> : <Navigate to={isAuthenticated ? "/admin" : "/signin"} />} />
          {/* Route cho admin */}
          <Route path="/admin/*" element={isAuthenticated && role === "admin" ? <AdminDashboard /> : <Navigate to="/signin" />} />
          <Route path='*' element={<NotFoundPage/>} />
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