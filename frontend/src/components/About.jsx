import { useState, useEffect } from "react";
import { fetchUser, updateUser, uploadProfileImage } from "../api/userApi";

const userId = localStorage.getItem("userId");

const About = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    profilePic: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, []);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Handle Save
  const handleSave = async () => {
    try {
      let updatedUser = { ...user };
      if (selectedImage) {
        const imageUrl = await uploadProfileImage(selectedImage);
        updatedUser.profilePic = imageUrl;
      }

      await updateUser(userId, updatedUser);
      setUser(updatedUser);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          About Me
        </h2>

        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <img
            src={
              user.profilePic ||
              "https://i.ibb.co.com/SwVLhnGg/guitar-with-black-body-yellow-body.jpg"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md mb-4"
          />

          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
          )}

          {/* User Info */}
          <p className="text-left text-lg font-semibold text-gray-800">
            Name : {user.name}
          </p>
          <p className="text-left text-gray-600 text-lg font-semibold">
            Email : {user.email}
          </p>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Bio:</label>
          {editMode ? (
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          ) : (
            <p className="text-gray-600">{user.bio || "No bio added"}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Location:</label>
          {editMode ? (
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          ) : (
            <p className="text-gray-600">
              {user.location || "No location added"}
            </p>
          )}
        </div>

        {/* Edit and Save Buttons */}
        {editMode ? (
          <button
            onClick={handleSave}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition mt-4"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition mt-4"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default About;
