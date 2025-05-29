import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authService";
import GoogleSignInButton from "../components/GoogleSignInButton";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn(form);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role", res.data.user?.role || "member");

      const role = res.data.user?.role;
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message;
      setMessage(Array.isArray(msg) ? msg.join(", ") : msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 mb-2">Or sign in with</p>
          <GoogleSignInButton setMessage={setMessage} />
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}
