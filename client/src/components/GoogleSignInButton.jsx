import { GoogleLogin } from "@react-oauth/google";
import axiosClient from "../api/axiosClient";

import { useNavigate } from "react-router-dom";

export default function GoogleSignInButton({ setMessage }) {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axiosClient.post("/api/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role", res.data.user?.role || "member");

      if (res.data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setMessage("Google login failed.");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => setMessage("Google login failed")}
    />
  );
}
