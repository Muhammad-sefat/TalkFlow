import axios from "axios";

const API_URL = "http://localhost:5000/api/friends";
const getToken = () => localStorage.getItem("userToken");

export const sendFriendRequest = async (receiverEmail) => {
  console.log(receiverEmail);
  try {
    await axios.post(
      `${API_URL}/send`,
      { receiverEmail },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return "Friend request sent";
  } catch (error) {
    throw error.response?.data || "Error sending request";
  }
};

export const acceptFriendRequest = async (senderId) => {
  try {
    await axios.post(
      `${API_URL}/accept/${senderId}`,
      {},
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );

    return "Friend request accepted";
  } catch (error) {
    throw error.response?.data || "Error accepting request";
  }
};

export const rejectFriendRequest = async (senderId) => {
  try {
    await axios.post(
      `${API_URL}/reject`,
      { senderId },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return "Friend request rejected";
  } catch (error) {
    throw error.response?.data || "Error rejecting request";
  }
};

export const getFriends = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching friends";
  }
};

export const getPendingRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/requests`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching requests";
  }
};

export const getSentRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/sent`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching sent requests";
  }
};
