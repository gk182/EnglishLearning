import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";
import GoogleSignInButton from "../components/GoogleSignInButton";

export default function SignUp() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const res = await signUp(form);
      setMessage(res.data.message);
      navigate("/signin");
    } catch (err) {
      const msg = err.response?.data?.message;
      setMessage(Array.isArray(msg) ? msg.join(", ") : msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="userName"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 mb-2">Or sign up with</p>
          <GoogleSignInButton setMessage={setMessage} />
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}
