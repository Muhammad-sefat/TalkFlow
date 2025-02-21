import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-r from-blue-600 to-purple-700 text-white p-5 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6">TalkFlow</h1>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <Link
            to="about"
            className="p-2 rounded-lg hover:bg-blue-500 transition"
          >
            About
          </Link>
          <Link
            to="friends"
            className="p-2 rounded-lg hover:bg-blue-500 transition"
          >
            Friend List
          </Link>
          <Link
            to="chat"
            className="p-2 rounded-lg hover:bg-blue-500 transition"
          >
            Chat
          </Link>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto p-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Dynamic Content Area */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />{" "}
        {/* This renders the selected component (About, Friends, Chat) */}
      </main>
    </div>
  );
};

export default Dashboard;
