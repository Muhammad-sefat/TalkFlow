const User = require("../models/user");

// Get user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    // Merge old data with new data
    const updatedData = {
      name: req.body.name || existingUser.name,
      bio: req.body.bio || existingUser.bio,
      location: req.body.location || existingUser.location,
      profilePic: req.body.profilePic || existingUser.profilePic,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

module.exports = { getUser, updateUser };
