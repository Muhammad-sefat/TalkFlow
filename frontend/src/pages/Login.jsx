import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-600 to-purple-800">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
            Login
          </button>
        </form>

        <div className="text-center my-4">OR</div>

        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
          Sign in with Google
        </button>

        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-500 font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
