// components/GoogleAuthButton.jsx
import React from "react";

const GoogleAuthButton = ({ label }) => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
    >
      {label}
    </button>
  );
};

export default GoogleAuthButton;
