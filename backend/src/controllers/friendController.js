const User = require("../models/user");

const sendFriendRequest = async (req, res) => {
  try {
    const { receiverEmail } = req.body;
    const senderId = req.user.id;
    console.log(receiverEmail);

    const receiver = await User.findOne({ email: receiverEmail });
    console.log(receiver);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }
    if (receiver.id === senderId) {
      return res
        .status(400)
        .json({ message: "You cannot send a request to yourself." });
    }
    if (
      receiver.friendRequests.includes(senderId) ||
      receiver.friends.includes(senderId)
    ) {
      return res.status(400).json({
        message: "Friend request already sent or users are already friends.",
      });
    }

    receiver.friendRequests.push(senderId);
    await receiver.save();

    const sender = await User.findById(senderId);
    sender.sentFriendRequests.push({ receiver: receiver._id });
    await sender.save();

    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending friend request", error: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { senderId } = req.body;
    const receiverId = req.user.id;

    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ message: "No friend request found" });
    }

    receiver.friends.push(senderId);
    sender.friends.push(receiverId);

    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== senderId
    );
    sender.sentFriendRequests = sender.sentFriendRequests
      .map((item) => {
        if (item.receiver.toString() === receiverId) {
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);

    await receiver.save();
    await sender.save();

    res.json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({
      message: "Error accepting friend request",
      error: error.message,
    });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const { senderId } = req.body;
    const receiverId = req.user.id;

    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
      return res.status(404).json({ message: "User not found" });
    }

    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== senderId
    );
    sender.sentFriendRequests = sender.sentFriendRequests.map((item) => {
      if (item.receiver.toString() === receiverId) {
        item.status = "rejected";
        return item;
      }
      return item;
    });

    await receiver.save();
    await sender.save();

    res.json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({
      message: "Error rejecting friend request",
      error: error.message,
    });
  }
};

const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "friends",
      "name email"
    );
    res.json(user.friends);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching friends", error: error.message });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "friendRequests",
      "name email"
    );
    res.json(user.friendRequests);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching friend requests",
        error: error.message,
      });
  }
};

const getSentRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "sentFriendRequests.receiver",
      "name email"
    );
    res.json(user.sentFriendRequests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sent requests", error: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
  getPendingRequests,
  getSentRequests,
};
