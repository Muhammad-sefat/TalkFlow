import axios from "axios";
const token = localStorage.getItem("userToken");

const API_URL = "http://localhost:5000/api/user";
const IMG_BB_API_KEY = "27a5fca24da89d48f496cddd1dd05cc4";

// Fetch user details
export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Update user details
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Upload profile image to ImgBB
export const uploadProfileImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
      formData
    );
    return response.data.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
