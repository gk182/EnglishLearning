
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <div
      className="w-64 h-screen text-white fixed"
      style={{ backgroundColor: "var(--color-primary-light)" }}
    >
      <h2 className="text-2xl font-bold p-4 border-b border-white/20">Admin</h2>
      <nav className="flex flex-col gap-2 p-4">
        <Link
          to="/admin"
          className="hover:bg-white/10 p-2 rounded transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/topics"
          className="hover:bg-white/10 p-2 rounded transition-colors"
        >
          Topics
        </Link>
        <Link
          to="/admin/lessons"
          className="hover:bg-white/10 p-2 rounded transition-colors"
        >
          Lessons
        </Link>
        <Link
          to="/admin/users"
          className="hover:bg-white/10 p-2 rounded transition-colors"
        >
          Users
        </Link>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          type="button"
          className="w-full py-2 rounded bg-white text-black hover:bg-gray-200 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
