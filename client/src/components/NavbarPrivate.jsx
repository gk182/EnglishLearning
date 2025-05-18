import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function NavbarPrivate() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className="fixed top-0 left-0 right-0 h-20 flex items-center px-8 bg-white shadow-md z-50"
      style={{ backgroundColor: "var(--background-light)" }}
    >
      <nav className="max-w-7xl mx-auto w-full flex items-center gap-8 text-base font-medium">
        <Link
          to="/dashboard"
          className={`transition-colors px-2 py-1 rounded border-b-2 ${
            isActive('/dashboard')
              ? 'border-indigo-400 text-indigo-700'
              : 'border-transparent text-var(--color-primary-dark) hover:text-indigo-700 hover:border-indigo-300'
          }`}
          style={!isActive('/dashboard') ? { color: 'var(--color-primary-dark)' } : {}}
        >
          Dashboard
        </Link>

        <Link
          to="/listening"
          className={`transition-colors px-2 py-1 rounded border-b-2 ${
            isActive('/listening')
              ? 'border-indigo-400 text-indigo-700'
              : 'border-transparent text-var(--color-primary-dark) hover:text-indigo-700 hover:border-indigo-300'
          }`}
          style={!isActive('/listening') ? { color: 'var(--color-primary-dark)' } : {}}
        >
          Listening Practice
        </Link>

        <Link
          to="/grammar"
          className={`transition-colors px-2 py-1 rounded border-b-2 ${
            isActive('/grammar')
              ? 'border-indigo-400 text-indigo-700'
              : 'border-transparent text-var(--color-primary-dark) hover:text-indigo-700 hover:border-indigo-300'
          }`}
          style={!isActive('/grammar') ? { color: 'var(--color-primary-dark)' } : {}}
        >
          Check grammar
        </Link>

        <Link
          to="/dictionary"
          className={`transition-colors px-2 py-1 rounded border-b-2 ${
            isActive('/dictionary')
              ? 'border-indigo-400 text-indigo-700'
              : 'border-transparent text-var(--color-primary-dark) hover:text-indigo-700 hover:border-indigo-300'
          }`}
          style={!isActive('/dictionary') ? { color: 'var(--color-primary-dark)' } : {}}
        >
          Dictionary
        </Link>

        <button
          onClick={handleLogout}
          className="ml-auto px-4 py-2 btn-primary"
          type="button"
        >
          Log Out
        </button>
      </nav>
    </header>
  );
}
