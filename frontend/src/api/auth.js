import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Signup failed";
  }
};

// Login
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};

// google login
export const googleLogin = async (tokenId) => {
  try {
    const response = await fetch(`${API_URL}/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenId }),
    });
    return await response.json();
  } catch (error) {
    console.error("Google Login Error", error);
    throw error;
  }
};
