import { useState } from "react";
import { signIn } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import axios from "axios";

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
      setMessage(res.data.message);
      localStorage.setItem("token", res.data.accessToken);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message;
      setMessage(Array.isArray(msg) ? msg.join(", ") : msg);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/google", {
        token: credentialResponse.credential,
      });
      localStorage.setItem("token", res.data.accessToken);
      console.log("Đăng nhập thành công:", res.data);
      navigate("/dashboard");
      // setMessage("Đăng nhập Google thành công!");
    } catch (err) {
      console.error(
        "Lỗi đăng nhập Google:",
        error.response?.data || error.message
      );
      // setMessage("Đăng nhập Google thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600 focus:outline-none focus:ring-1"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600 focus:outline-none focus:ring-1"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-3 text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="mb-4 text-gray-500">Or</p>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMessage("Sign in by Google unsucessfuly!")}
            />
          </div>
        </div>

        {message && (
          <p className="mt-6 text-center text-sm text-red-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
