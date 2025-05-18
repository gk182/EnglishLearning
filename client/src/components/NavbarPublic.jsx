import { Link } from "react-router-dom";

export default function NavbarPublic() {
  return (
    <header
      className="fixed top-0 left-0 right-0 h-20 flex items-center px-8 shadow-md z-50"
      style={{ backgroundColor: "var(--background-light)" }}
    >
      <nav className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold"
          style={{ color: "var(--color-primary-dark)" }}
        >
          E-learning
        </Link>
        <div className="flex gap-8 text-base font-medium">
          <Link to="/signin" className="btn-login">
            Sign In
          </Link>
          <Link to="/signup" className="btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
