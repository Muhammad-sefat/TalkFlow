import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    localStorage.setItem("userId", response.data._id);
    localStorage.setItem("userToken", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Signup failed";
  }
};

// Login
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    localStorage.setItem("userId", response.data._id);
    localStorage.setItem("userToken", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};
