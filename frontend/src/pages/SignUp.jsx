import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await signup({ name, email, password });
      localStorage.setItem("userToken", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-600 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center my-4">OR</div>

        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
          Sign up with Google
        </button>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/" className="text-purple-500 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
